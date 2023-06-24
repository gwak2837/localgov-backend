import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { lofinFields, sidoCodes, sigunguCodes } from '../../common/lofin'
import { pool } from '../../common/postgres'
import { IGetLocalExpendituresResult } from './sql/getLocalExpenditures'
import getLocalExpenditures from './sql/getLocalExpenditures.sql'
import { IGetLocalExpendituresByFieldResult } from './sql/getLocalExpendituresByField'
import getLocalExpendituresByField from './sql/getLocalExpendituresByField.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),

      localCodes: Type.Optional(Type.Array(Type.Number())),
      fieldCodes: Type.Optional(Type.Array(Type.Number())),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/local', { schema }, async (req) => {
    const { dateFrom, dateTo, localCodes, fieldCodes, count } = req.query

    // Request validation
    if (count && count > 100) throw BadRequestError('Invalid `count`')

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    const validLocalCodes = getValidLocalCodes(localCodes)

    // SQL
    if (fieldCodes) {
      const { rowCount, rows } = await pool.query<IGetLocalExpendituresByFieldResult>(
        getLocalExpendituresByField,
        [dateFrom, dateTo, validLocalCodes, fieldCodes, count ?? 20]
      )

      if (rowCount === 0)
        throw NotFoundError('No expenditure could be found that satisfies these conditions...')

      return {
        expenditures: rows.map((row) => ({
          id: row.id,
          sfrnd_code: row.sfrnd_code,
          excut_de: row.excut_de,
          realm_code: row.realm_code,
          detailBusinessName: row.detail_bsns_nm,
          budgetSum: row.budget_crntam,
          nxndrSum: row.nxndr,
          citySum: row.cty,
          sigunguSum: row.signgunon,
          etcSum: row.etc_crntam,
          expndtramSum: row.expndtram,
          organizationSum: row.orgnztnam,
        })),
      }
    } else {
      const { rowCount, rows } = await pool.query<IGetLocalExpendituresResult>(
        getLocalExpenditures,
        [dateFrom, dateTo, validLocalCodes]
      )

      if (rowCount === 0)
        throw NotFoundError('No expenditure could be found that satisfies these conditions...')

      return {
        expenditures: rows.map((row) => ({
          realm: lofinFields[row.realm_code],
          realm_code: row.realm_code,
          budget_crntam_sum: row.budget_crntam_sum,
          nxndr_sum: row.nxndr_sum,
          cty_sum: row.cty_sum,
          signgunon_sum: row.signgunon_sum,
          etc_crntam_sum: row.etc_crntam_sum,
          expndtram_sum: row.expndtram_sum,
          orgnztnam_sum: row.orgnztnam_sum,
        })),
      }
    }
  })
}

function getValidLocalCodes(localCodes: number[] | undefined) {
  if (!localCodes) return localCodes

  const results = new Set()

  for (const localCode of localCodes) {
    if (sidoCodes.includes(localCode)) {
      const s = sigunguCodes.filter((c) => `${c}`.slice(0, 2) === `${localCode}`)
      for (const sigunguCode of s) {
        results.add(sigunguCode)
      }
    } else if (sigunguCodes.includes(localCode)) {
      results.add(localCode)
    } else {
      throw BadRequestError('Invalid `localCodes`')
    }
  }

  return Array.from(results)
}
