import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { locals, lofinRealms, provinces } from '../../common/lofin'
import { pool } from '../../common/postgres'
import { IGetLocalExpendituresResult } from './sql/getLocalExpenditures'
import getLocalExpenditures from './sql/getLocalExpenditures.sql'
import { IGetLocalExpendituresByRealmResult } from './sql/getLocalExpendituresByRealm'
import getLocalExpendituresByRealm from './sql/getLocalExpendituresByRealm.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const provinceCodes = Object.keys(provinces).map((codes) => +codes)
  const localCodes = Object.keys(locals).map((codes) => +codes)

  const schema2 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      localCode: Type.Number(),
    }),
  }

  fastify.get('/expenditure/local', { schema: schema2 }, async (req) => {
    const { dateFrom, dateTo, localCode } = req.query
    const isWholeProvince = localCode ? localCode > 0 && localCode < 100 : false

    // Request validation
    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    if (localCode && !provinceCodes.includes(localCode) && !localCodes.includes(localCode))
      throw BadRequestError('Invalid `localCode`')

    // SQL
    const { rowCount, rows } = await pool.query<IGetLocalExpendituresResult>(getLocalExpenditures, [
      localCode ? (isWholeProvince ? localCode * 100_000 : localCode) : null,
      isWholeProvince,
      dateFrom,
      dateTo,
    ])

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows.map((row) => ({
        realm: lofinRealms[row.realm_code],
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
      localCode: Type.Number(),
      realmCode: Type.Number(),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/local/realm', { schema: schema3 }, async (req) => {
    const { dateFrom, dateTo, localCode, realmCode, count } = req.query
    const isWholeProvince = localCode ? localCode > 0 && localCode < 100 : false

    // Request validation
    if (count && count > 100) throw BadRequestError('Invalid `count`')

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    if (localCode && !provinceCodes.includes(localCode) && !localCodes.includes(localCode))
      throw BadRequestError('Invalid `localCode`')

    // SQL
    const { rowCount, rows } = await pool.query<IGetLocalExpendituresByRealmResult>(
      getLocalExpendituresByRealm,
      [
        localCode ? (isWholeProvince ? localCode * 100_000 : localCode) : null,
        isWholeProvince,
        dateFrom,
        dateTo,
        realmCode,
        count ?? 20,
      ]
    )

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows.map((row) => ({
        detailBusinessName: row.detail_bsns_nm,
        budgetSum: row.budget_crntam_sum,
        nxndrSum: row.nxndr_sum,
        citySum: row.cty_sum,
        sigunguSum: row.signgunon_sum,
        etcSum: row.etc_crntam_sum,
        expndtramSum: row.expndtram_sum,
        organizationSum: row.orgnztnam_sum,
      })),
    }
  })
}
