import retry from 'async-retry'
import fetch from 'node-fetch'

import { CLOUD_RUN_TASK_COUNT, CLOUD_RUN_TASK_INDEX, LOFIN_KEY } from '../common/constants'
import { locals } from '../common/lofin'
import { pool } from '../common/postgres'
import { toDate8, toISODate } from '../common/utils'
import { ErrorHead, Expenditure, Head } from '../types'
import { ICountExpendituresResult } from './countExpenditures'
import countExpenditures from './countExpenditures.sql'
import createExpenditures from './createExpenditures.sql'
import deleteExpenditures from './deleteExpenditures.sql'

main()

async function main() {
  const date = new Date('2022-12-31')
  date.setDate(date.getDate() - +CLOUD_RUN_TASK_INDEX)

  for (; date.getFullYear() > 2021; date.setDate(date.getDate() - +CLOUD_RUN_TASK_COUNT)) {
    await retry(() => getAllLocalGovExpenditures(date), {
      retries: 10,
      onRetry: (e, attemp) => console.warn(attemp, e.message),
    })
  }
}

async function getAllLocalGovExpenditures(date: Date) {
  for (const localGovCode of Object.keys(locals)) {
    console.log('👀 - date', date, 'localGovCode', localGovCode, locals[+localGovCode])
    const { data, head } = await fetchLocalFinance(1, 1, localGovCode, toDate8(date))
    if (!data) continue

    const size = 1000
    const totalExpenditureCount = head[0].list_total_count
    console.log('👀 - totalExpenditureCount', totalExpenditureCount)

    const { rows } = await pool.query<ICountExpendituresResult>(countExpenditures, [
      date,
      localGovCode,
    ])

    const count = rows[0].count
    if (count && +count === totalExpenditureCount) {
      continue
    } else {
      await pool.query(deleteExpenditures, [date, localGovCode])
    }

    for (let i = 1; (i - 1) * size < totalExpenditureCount; i++) {
      const { data: expenditures } = await fetchLocalFinance(i, size, localGovCode, toDate8(date))
      console.log('👀', i)
      if (!expenditures) continue

      // sort_ordr 열 제거, 형식 맞추기
      pool.query(createExpenditures, [
        expenditures.map((expenditure) => +expenditure.sfrnd_code),
        expenditures.map((expenditure) => expenditure.accnut_se_code),
        expenditures.map((expenditure) => expenditure.accnut_se_nm),
        expenditures.map((expenditure) => +expenditure.dept_code),
        expenditures.map((expenditure) => expenditure.detail_bsns_code),
        expenditures.map((expenditure) => expenditure.detail_bsns_nm),
        expenditures.map((expenditure) => new Date(toISODate(expenditure.excut_de))),
        expenditures.map((expenditure) => +expenditure.budget_crntam),
        expenditures.map((expenditure) => +expenditure.nxndr),
        expenditures.map((expenditure) => +expenditure.cty),
        expenditures.map((expenditure) => +expenditure.signgunon),
        expenditures.map((expenditure) => +expenditure.etc_crntam),
        expenditures.map((expenditure) => +expenditure.expndtram),
        expenditures.map((expenditure) => +expenditure.orgnztnam),
        expenditures.map((expenditure) => expenditure.realm_code),
        expenditures.map((expenditure) => expenditure.sect_code),
      ])
    }
  }
}

async function fetchLocalFinance(index: number, size: number, local: string, date: string) {
  const year = date.slice(0, 4)
  const a = await fetch(
    `https://lofin.mois.go.kr/HUB/QWGJK?key=${LOFIN_KEY}&Type=json&pIndex=${index}&pSize=${size}&accnut_year=${year}&wdr_sfrnd_code=${local}&excut_de=${date}`
  )
  const result = (await a.json()) as any
  if (result.RESULT?.CODE) return { head: result.RESULT as ErrorHead, data: null }

  const head = result.QWGJK[0].head as Head

  return { head, data: result.QWGJK[1].row as Expenditure[] }
}
