import fs from 'fs'

import fetch from 'node-fetch'

import { LOFIN_KEY } from '../src/common/constants'
import { pool } from '../src/common/postgres'
import { toISODate } from '../src/common/utils'
import { Expenditure } from '../src/types'
import createExpenditures from './createExpenditures.sql'

const directory = './result'

fs.mkdirSync(directory, { recursive: true })

const code = 1100000

async function main() {
  // for (let i = 1; true; i++) {
  const { data: expenditures, head } = await fetchLocalFinance(1, 4, code, '20221212')
  console.log('👀 - head', head)

  // if (!expenditures) continue
  if (!expenditures) return

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

  // }
}

async function fetchLocalFinance(index: number, size: number, local: number, date: string) {
  const year = date.slice(0, 4)
  const a = await fetch(
    `https://lofin.mois.go.kr/HUB/QWGJK?key=${LOFIN_KEY}&Type=json&pIndex=${index}&pSize=${size}&accnut_year=${year}&wdr_sfrnd_code=${local}&excut_de=${date}`
  )
  const result = await a.json()
  if (result.RESULT?.CODE) return { head: result.RESULT, data: null }

  const head = result.QWGJK[0].head

  return { head, data: result.QWGJK[1].row as Expenditure[] }
}

main()
