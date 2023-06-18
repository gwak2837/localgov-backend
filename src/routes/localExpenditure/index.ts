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
  const schema2 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),

      localCode: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/local', { schema: schema2 }, async (req) => {
    const { dateFrom, dateTo, localCode } = req.query

    // Request validation
    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    if (localCode && !sidoCodes.includes(localCode) && !sigunguCodes.includes(localCode))
      throw BadRequestError('Invalid `localCode`')

    // SQL
    const { rowCount, rows } = await pool.query<IGetLocalExpendituresResult>(getLocalExpenditures, [
      dateFrom,
      dateTo,
      localCode,
    ])

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
  })

  const schema3 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      realmCode: Type.Number(),

      localCode: Type.Optional(Type.Number()),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/local/realm', { schema: schema3 }, async (req) => {
    const { dateFrom, dateTo, localCode, realmCode, count } = req.query

    // Request validation
    if (count && count > 100) throw BadRequestError('Invalid `count`')

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    if (localCode && !sidoCodes.includes(localCode) && !sigunguCodes.includes(localCode))
      throw BadRequestError('Invalid `localCode`')

    // SQL
    const { rowCount, rows } = await pool.query<IGetLocalExpendituresByFieldResult>(
      getLocalExpendituresByField,
      [dateFrom, dateTo, localCode, realmCode, count ?? 20]
    )

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows.map((row) => ({
        id: row.id,
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
  })
}
