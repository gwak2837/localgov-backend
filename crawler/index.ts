import fs from 'fs'

import fetch from 'node-fetch'

import { LOFIN_KEY } from '../src/common/constants'
import { pool } from '../src/common/postgres'
import { toDate8, toISODate } from '../src/common/utils'
import { ErrorHead, Expenditure, Head } from '../src/types'
import createExpenditures from './createExpenditures.sql'

const directory = './result'

fs.mkdirSync(directory, { recursive: true })

const localGovernments = {
  서울: 1100000,
  부산: 2600000,
  대구: 2700000,
  인천: 2800000,
  광주: 2900000,
  대전: 3000000,
  울산: 3100000,
  세종: 3200000,
  경기: 4100000,
  강원: 4200000,
  충북: 4300000,
  충남: 4400000,
  전북: 4500000,
  전남: 4600000,
  경북: 4700000,
  경남: 4800000,
  제주: 4900000,
}

const date = new Date('2022-12-31')

async function main() {
  for (const localGovCode of Object.values(localGovernments)) {
    for (; date.getFullYear() > 2021; date.setDate(date.getDate() - 1)) {
      const { data, head } = await fetchLocalFinance(1, 1, localGovCode, toDate8(date))
      if (!data) continue

      const size = 1000
      const totalExpenditureCount = head[0].list_total_count

      for (let i = 1; (i - 1) * size < totalExpenditureCount; i++) {
        const { data: expenditures, head } = await fetchLocalFinance(
          i,
          size,
          localGovCode,
          toDate8(date)
        )
        console.log('👀 - head', head)
        if (!expenditures) continue

        // sort_ordr 열 제거, 형식 맞추기
        pool.query(createExpenditures, [
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
}

async function fetchLocalFinance(index: number, size: number, local: number, date: string) {
  const year = date.slice(0, 4)
  const a = await fetch(
    `https://lofin.mois.go.kr/HUB/QWGJK?key=${LOFIN_KEY}&Type=json&pIndex=${index}&pSize=${size}&accnut_year=${year}&wdr_sfrnd_code=${local}&excut_de=${date}`
  )
  const result = await a.json()
  if (result.RESULT?.CODE) return { head: result.RESULT as ErrorHead, data: null }

  const head = result.QWGJK[0].head as Head

  return { head, data: result.QWGJK[1].row as Expenditure[] }
}

main()
