import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { locals, provinces, realms } from '../../common/lofin'
import { pool } from '../../common/postgres'
import { IGetLocalExpendituresResult } from './sql/getLocalExpenditures'
import getLocalExpenditures from './sql/getLocalExpenditures.sql'
import { IGetLocalExpendituresByRealmResult } from './sql/getLocalExpendituresByRealm'
import getLocalExpendituresByRealm from './sql/getLocalExpendituresByRealm.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const provinceCodes = Object.keys(provinces).map((codes) => +codes)
  const localCodes = Object.keys(locals).map((codes) => +codes)

  // const schema = {
  //   querystring: Type.Object({
  //     date: Type.String(),
  //     localGovCode: Type.Optional(Type.Number()),
  //     selectAllLocalGov: Type.Optional(Type.Boolean()),
  //     projectCodes: Type.Optional(Type.Array(Type.String())),
  //     count: Type.Optional(Type.Number()),
  //   }),
  // }

  // fastify.get('/local-expenditure', { schema }, async (req) => {
  //   const { date, localGovCode, selectAllLocalGov, projectCodes, count } = req.query

  //   const parsedDate = Date.parse(date)
  //   if (isNaN(parsedDate)) throw BadRequestError('Invalid format of `date`')

  //   if (localGovCode) {
  //     if (!(selectAllLocalGov ? localCodes : localGovCodes).includes(localGovCode))
  //       throw BadRequestError('Invalid `localGovCode`')
  //   }

  //   const { rowCount, rows } = await pool.query<IGetLocalGovsExpendituresResult>(
  //     getLocalExpenditures,
  //     [new Date(parsedDate), localGovCode, selectAllLocalGov, projectCodes, count ?? 20]
  //   )

  //   if (rowCount === 0)
  //     throw NotFoundError('No expenditure could be found that satisfies these conditions...')

  //   return {
  //     date,
  //     expenditures: rows.map((row) => ({
  //       id: row.id,
  //       sfrnd_name: localGovernments[row.sfrnd_code] ?? row.sfrnd_code,
  //       detail_bsns_nm: row.detail_bsns_nm,
  //       budget_crntam: row.budget_crntam,
  //       nxndr: row.nxndr,
  //       cty: row.cty,
  //       signgunon: row.signgunon,
  //       etc_crntam: row.etc_crntam,
  //       expndtram: row.expndtram,
  //       orgnztnam: row.orgnztnam,
  //       realm_name: realms[row.realm_code] ?? row.realm_code,
  //       sect_name: sectors[row.sect_code] ?? row.sect_code,
  //     })),
  //   }
  // })

  const schema2 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),

      // undefined: 전국
      localCode: Type.Optional(Type.Number()),

      // true: 시/도 전체
      isWholeProvince: Type.Optional(Type.Boolean()),
    }),
  }

  fastify.get('/expenditure/local', { schema: schema2 }, async (req) => {
    const { dateFrom, dateTo, localCode, isWholeProvince } = req.query

    if (localCode && !localCodes.includes(localCode)) throw BadRequestError('Invalid `localCode`')

    const { rowCount, rows } = await pool.query<IGetLocalExpendituresResult>(getLocalExpenditures, [
      dateFrom,
      dateTo,
      localCode,
      isWholeProvince,
    ])

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      dateFrom,
      dateTo,
      localCode,
      isWholeProvince,
      expenditures: rows.map((row) => ({
        realm: realms[row.realm_code],
        budgetSum: row.budget_crntam_sum,
      })),
    }
  })

  const schema3 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),

      // undefined: 전국
      localCode: Type.Optional(Type.Number()),

      // true: 시/도 전체
      isWholeProvince: Type.Optional(Type.Boolean()),

      projectCode: Type.Number(),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/local/realm', { schema: schema3 }, async (req) => {
    const { dateFrom, dateTo, localCode, isWholeProvince, projectCode, count } = req.query

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (localCode) {
      if (!(isWholeProvince ? provinceCodes : localCodes).includes(localCode))
        throw BadRequestError('Invalid `localGovCode`')
    }

    const { rowCount, rows } = await pool.query<IGetLocalExpendituresByRealmResult>(
      getLocalExpendituresByRealm,
      [dateFrom, dateTo, localCode, isWholeProvince, projectCode, count]
    )

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      dateFrom,
      dateTo,
      localGovCode: localCode,
      isWholeProvince,
      projectCode: realms[projectCode],
      expenditures: rows.map((row) => ({
        detailBusinessName: row.detail_bsns_nm,
        budgetSum: row.budget_crntam_sum,
      })),
    }
  })
}
