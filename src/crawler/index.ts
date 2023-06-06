import retry from 'async-retry'
import fetch from 'node-fetch'

import {
  CEFIN_KEY,
  CLOUD_RUN_TASK_COUNT,
  CLOUD_RUN_TASK_INDEX,
  LOCAL_EXPENDITURE_DATE,
  LOFIN_KEY,
} from '../common/constants'
import { sidoCodes, sigunguCodes } from '../common/lofin'
import { pool } from '../common/postgres'
import { toDate8, toISODate } from '../common/utils'
import { CenterExpenditure, ErrorHead, Expenditure, Head } from '../types'
import countCenterExpenditures from './countCenterExpenditures.sql'
import { ICountExpendituresResult } from './countExpenditures'
import countExpenditures from './countExpenditures.sql'
import createCenterExpenditures from './createCenterExpenditures.sql'
import createExpenditures from './createExpenditures.sql'
import deleteCenterExpenditures from './deleteCenterExpenditures.sql'
import deleteExpenditures from './deleteExpenditures.sql'

main()

async function main() {
  // const date = new Date(LOCAL_EXPENDITURE_DATE)
  // date.setDate(date.getDate() - +CLOUD_RUN_TASK_INDEX)
  // for (; date.getFullYear() > 2021; date.setDate(date.getDate() - +CLOUD_RUN_TASK_COUNT)) {
  //   await retry(() => getLocalGovExpenditures(date), {
  //     retries: 10,
  //     onRetry: (e, attemp) => console.warn(attemp, e.message),
  //   })
  // }

  const date = new Date(LOCAL_EXPENDITURE_DATE)
  date.setFullYear(date.getFullYear() - +CLOUD_RUN_TASK_INDEX)
  for (; date.getFullYear() > 2000; date.setFullYear(date.getFullYear() - +CLOUD_RUN_TASK_COUNT)) {
    await retry(() => getLocalGovExpenditures(date), {
      retries: 10,
      onRetry: (e, attemp) => console.warn(attemp, e.message),
    })
  }

  await retry(() => getLocalGovExpenditures(date), {
    retries: 10,
    onRetry: (e, attemp) => console.warn(attemp, e.message),
  })

  for (let year = 2023 - +CLOUD_RUN_TASK_INDEX; year > 2006; year -= +CLOUD_RUN_TASK_COUNT) {
    await retry(() => getCenterGovExpenditures(year), {
      retries: 10,
      onRetry: (e, attemp) => console.warn(attemp, e.message),
    })
  }
}

async function getLocalGovExpenditures(date: Date) {
  for (const _sidoCode of Object.keys(sidoCodes)) {
    const fullSidoCode = `${_sidoCode}00000`
    console.log('👀 - date', date, 'sidoCode', _sidoCode, sidoCodes[+_sidoCode])

    const { data, head } = await fetchLocalFinance(1, 1, fullSidoCode, toDate8(date))
    if (!data) continue

    const size = 1000
    const totalExpenditureCount = head[0].list_total_count
    process.stdout.write(`👀 - totalExpenditureCount: ${totalExpenditureCount}, `)

    const { rows } = await pool.query<ICountExpendituresResult>(countExpenditures, [
      date,
      fullSidoCode,
    ])

    const count = rows[0].count
    console.log('count:', +(count ?? 0))
    if (count && +count === totalExpenditureCount) {
      continue
    } else {
      await pool.query(deleteExpenditures, [date, fullSidoCode])
    }

    for (let i = 1; (i - 1) * size < totalExpenditureCount; i++) {
      process.stdout.write(`${i} `)
      const { data: expenditures } = await fetchLocalFinance(i, size, fullSidoCode, toDate8(date))
      if (!expenditures) continue

      // sort_ordr 열 제거, 형식 맞추기
      pool.query(createExpenditures, [
        expenditures.map((expenditure) => +expenditure.sfrnd_code),
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

    console.log('')
  }
}

async function fetchLocalFinance(index: number, size: number, sidoCode: string, date: string) {
  const year = date.slice(0, 4)
  const url = `https://lofin.mois.go.kr/HUB/QWGJK?key=${LOFIN_KEY}&type=json&pIndex=${index}&pSize=${size}&accnut_year=${year}&wdr_sfrnd_code=${sidoCode}&excut_de=${date}`
  const a = await fetch(url)
  const result = (await a.json()) as any
  if (result.RESULT?.CODE) return { head: result.RESULT as ErrorHead, data: null }

  const head = result.QWGJK[0].head as Head

  return { head, data: result.QWGJK[1].row as Expenditure[] }
}

async function getCenterGovExpenditures(year: number) {
  console.log('👀 - year', year)
  const { data, head } = await fetchCenterFinance(1, 1, year)
  if (!data) return

  const size = 1000
  const totalExpenditureCount = head[0].list_total_count
  console.log('👀 - totalExpenditureCount', totalExpenditureCount)

  const { rows } = await pool.query<ICountExpendituresResult>(countCenterExpenditures, [year])

  const count = rows[0].count
  if (count && +count === totalExpenditureCount) {
    return
  } else {
    await pool.query(deleteCenterExpenditures, [year])
  }

  for (let i = 1; (i - 1) * size < totalExpenditureCount; i++) {
    process.stdout.write(`${i} `)

    const { data: expenditures } = await fetchCenterFinance(i, size, year)
    if (!expenditures) continue

    pool.query(createCenterExpenditures, [
      expenditures.map((expenditure) => +expenditure.FSCL_YY),
      expenditures.map((expenditure) => expenditure.OFFC_NM),
      expenditures.map((expenditure) => expenditure.FLD_NM),
      expenditures.map((expenditure) => expenditure.SECT_NM),
      expenditures.map((expenditure) => expenditure.PGM_NM),
      expenditures.map((expenditure) => expenditure.ACTV_NM),
      expenditures.map((expenditure) => expenditure.SACTV_NM),
      expenditures.map((expenditure) => expenditure.BZ_CLS_NM),
      expenditures.map((expenditure) => +expenditure.Y_PREY_FIRST_KCUR_AMT),
      expenditures.map((expenditure) => +expenditure.Y_PREY_FNL_FRC_AMT),
      expenditures.map((expenditure) => +expenditure.Y_YY_MEDI_KCUR_AMT),
      expenditures.map((expenditure) => +expenditure.Y_YY_DFN_MEDI_KCUR_AMT),
    ])
  }

  console.log('')
}

async function fetchCenterFinance(index: number, size: number, year: number) {
  const a = await fetch(
    `https://openapi.openfiscaldata.go.kr/TotalExpenditure5?Key=${CEFIN_KEY}&Type=json&pIndex=${index}&pSize=${size}&FSCL_YY=${year}&BDG_FND_DIV_CD=0&ANEXP_INQ_STND_CD=1`
  )
  const result = JSON.parse((await a.json()) as string) as any

  if (result.RESULT?.CODE) return { head: result.RESULT as ErrorHead, data: null }
  if (result.message) return { head: result.message, data: null }

  const head = result.TotalExpenditure5[0].head as Head

  return { head, data: result.TotalExpenditure5[1].row as CenterExpenditure[] }
}
