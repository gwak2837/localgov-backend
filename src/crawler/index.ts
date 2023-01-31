import fetch from 'node-fetch'

import { CLOUD_RUN_TASK_COUNT, CLOUD_RUN_TASK_INDEX, LOFIN_KEY } from '../common/constants'
import { pool } from '../common/postgres'
import { toDate8, toISODate } from '../common/utils'
import { ErrorHead, Expenditure, Head } from '../types'
import { ICountExpendituresResult } from './countExpenditures'
import countExpenditures from './countExpenditures.sql'
import { ICreateExpendituresResult } from './createExpenditures'
import createExpenditures from './createExpenditures.sql'
import { IDeleteExpendituresResult } from './deleteExpenditures'
import deleteExpenditures from './deleteExpenditures.sql'

main()

async function main() {
  const date = new Date('2022-12-31')
  date.setDate(date.getDate() - CLOUD_RUN_TASK_INDEX)

  for (; date.getFullYear() > 2021; date.setDate(date.getDate() - CLOUD_RUN_TASK_COUNT)) {
    await getAllLocalGovExpenditures(date)
  }
}

async function getAllLocalGovExpenditures(date: Date) {
  console.log('👀 - date', date)
  const localGovernments = {
    '1100000': '서울',
    '2600000': '부산',
    '2700000': '대구',
    '2800000': '인천',
    '2900000': '광주',
    '3000000': '대전',
    '3100000': '울산',
    '3200000': '세종',
    '4100000': '경기',
    '4200000': '강원',
    '4300000': '충북',
    '4400000': '충남',
    '4500000': '전북',
    '4600000': '전남',
    '4700000': '경북',
    '4800000': '경남',
    '4900000': '제주',
  }

  for (const localGovCode of Object.keys(localGovernments)) {
    console.log('👀 - localGovCode', localGovCode)
    const { data, head } = await fetchLocalFinance(1, 1, localGovCode, toDate8(date))
    if (!data) continue

    const size = 1000
    const totalExpenditureCount = head[0].list_total_count

    const { rows } = await pool.query<ICountExpendituresResult>(countExpenditures, [
      localGovCode,
      date,
    ])

    if (rows[0].count === totalExpenditureCount) {
      continue
    } else {
      await pool.query<IDeleteExpendituresResult>(deleteExpenditures, [localGovCode, date])
    }

    for (let i = 1; (i - 1) * size < totalExpenditureCount; i++) {
      const { data: expenditures, head } = await fetchLocalFinance(
        i,
        size,
        localGovCode,
        toDate8(date)
      )
      console.log('👀 - i', i, head)
      if (!expenditures) continue

      // sort_ordr 열 제거, 형식 맞추기
      pool.query<ICreateExpendituresResult>(createExpenditures, [
        expenditures.map((expenditure) => +expenditure.accnut_year),
        expenditures.map((expenditure) => expenditure.wdr_sfrnd_code),
        expenditures.map((expenditure) => expenditure.wdr_sfrnd_code_nm),
        expenditures.map((expenditure) => expenditure.sfrnd_code),
        expenditures.map((expenditure) => expenditure.sfrnd_nm_korean),
        expenditures.map((expenditure) => expenditure.accnut_se_code),
        expenditures.map((expenditure) => expenditure.accnut_se_nm),
        expenditures.map((expenditure) => expenditure.dept_code),
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
        expenditures.map((expenditure) => expenditure.realm_nm),
        expenditures.map((expenditure) => expenditure.sect_code),
        expenditures.map((expenditure) => expenditure.sect_nm),
        expenditures.map((expenditure) => expenditure.administ_sfrnd_code),
      ])
    }
  }
}

async function fetchLocalFinance(index: number, size: number, local: string, date: string) {
  const year = date.slice(0, 4)
  const a = await fetch(
    `https://lofin.mois.go.kr/HUB/QWGJK?key=${LOFIN_KEY}&Type=json&pIndex=${index}&pSize=${size}&accnut_year=${year}&wdr_sfrnd_code=${local}&excut_de=${date}`
  )
  const result = await a.json()
  if (result.RESULT?.CODE) return { head: result.RESULT as ErrorHead, data: null }

  const head = result.QWGJK[0].head as Head

  return { head, data: result.QWGJK[1].row as Expenditure[] }
}
