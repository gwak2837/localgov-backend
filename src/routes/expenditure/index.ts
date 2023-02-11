import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { localGovernments, locals, realms, sectors } from '../../common/lofin'
import { pool } from '../../common/postgres'
import { IGetExpendituresResult } from './sql/getExpenditures'
import getExpenditures from './sql/getExpenditures.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      date: Type.String(),
      localGovCode: Type.Optional(Type.Number()),
      selectAllLocalGov: Type.Optional(Type.Boolean()),
      projectCodes: Type.Optional(Type.Array(Type.String())),
      count: Type.Optional(Type.Number()),
    }),
  }

  const localCodes = Object.keys(locals).map((codes) => +codes)
  const localGovCodes = Object.keys(localGovernments).map((codes) => +codes)

  fastify.get('/expenditure', { schema }, async (req) => {
    const { date, localGovCode, selectAllLocalGov, projectCodes, count } = req.query

    const parsedDate = Date.parse(date)
    if (isNaN(parsedDate)) throw BadRequestError('Invalid format of `date`')

    if (localGovCode) {
      if (!(selectAllLocalGov ? localCodes : localGovCodes).includes(localGovCode))
        throw BadRequestError('Invalid `localGovCode`')
    }

    const { rowCount, rows } = await pool.query<IGetExpendituresResult>(getExpenditures, [
      new Date(parsedDate),
      localGovCode,
      selectAllLocalGov,
      projectCodes,
      count ?? 20,
    ])

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      date,
      expenditures: rows.map((row) => ({
        id: row.id,
        sfrnd_name: localGovernments[row.sfrnd_code] ?? row.sfrnd_code,
        accnut_se_nm: row.accnut_se_nm,
        detail_bsns_nm: row.detail_bsns_nm,
        budget_crntam: row.budget_crntam,
        nxndr: row.nxndr,
        cty: row.cty,
        signgunon: row.signgunon,
        etc_crntam: row.etc_crntam,
        expndtram: row.expndtram,
        orgnztnam: row.orgnztnam,
        realm_name: realms[row.realm_code] ?? row.realm_code,
        sect_name: sectors[row.sect_code] ?? row.sect_code,
      })),
    }
  })
}
