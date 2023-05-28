import { Type } from '@sinclair/typebox'

import { pool } from '../../common/postgres'
import { IGetCefinByOfficeResult } from './sql/getCefinByOffice'
import getCefinByOffice from './sql/getCefinByOffice.sql'
import { IGetCefinRatioResult } from './sql/getCefinRatio'
import getCefinRatio from './sql/getCefinRatio.sql'
import { IGetLofinByDistrictResult } from './sql/getLofinByDistrict'
import getLofinByDistrict from './sql/getLofinByDistrict.sql'
import { IGetLofinRatioResult } from './sql/getLofinRatio'
import getLofinRatio from './sql/getLofinRatio.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      localCode: Type.Number(),
      localDateFrom: Type.String(),
      localDateTo: Type.String(),
      centerYear: Type.Number(),
      isLocalRealm: Type.Boolean(),
    }),
  }

  fastify.get('/analysis/relation', { schema }, async (req, reply) => {
    const { localCode, localDateFrom, localDateTo, isLocalRealm, centerYear } = req.query

    const [{ rows }, { rows: rows2 }] = await Promise.all([
      pool.query<IGetLofinRatioResult>(getLofinRatio, [
        localCode,
        localDateFrom,
        localDateTo,
        isLocalRealm,
      ]),
      pool.query<IGetCefinRatioResult>(getCefinRatio, [centerYear, isLocalRealm]),
    ])

    return {
      lofin: rows,
      lofinTotalBudget: rows.map((row) => +(row.budget_crntam ?? 0)).reduce((a, b) => a + b, 0),
      cefin: rows2,
      cefinTotalBudget: rows2
        .map((row) => +(row.y_yy_dfn_medi_kcur_amt ?? 0))
        .reduce((a, b) => a + b, 0),
    }
  })

  const schema2 = {
    querystring: Type.Object({
      isRealm: Type.Boolean(),
      centerRealmOrSector: Type.Array(Type.String()),
      localRealmOrSector: Type.Number(),
    }),
  }

  fastify.get('/analysis/flow', { schema: schema2 }, async (req, reply) => {
    const { isRealm, centerRealmOrSector, localRealmOrSector } = req.query

    const [{ rows }, { rows: rows2 }] = await Promise.all([
      pool.query<IGetLofinByDistrictResult>(getLofinByDistrict, [isRealm, localRealmOrSector]),
      pool.query<IGetCefinByOfficeResult>(getCefinByOffice, [isRealm, centerRealmOrSector]),
    ])

    return { lofin: rows, cefin: rows2 }
  })
}
