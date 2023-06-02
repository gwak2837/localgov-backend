import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { locals } from '../../common/lofin'
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
      year: Type.Number(),
      localCode: Type.Number(),
      isRealm: Type.Boolean(),
    }),
  }

  fastify.get('/analysis/relation', { schema }, async (req, reply) => {
    const { year, localCode, isRealm } = req.query

    const [{ rows }, { rows: rows2 }] = await Promise.all([
      pool.query<IGetLofinRatioResult>(getLofinRatio, [
        localCode,
        `${year}-01-01`,
        `${year}-12-31`,
        isRealm,
      ]),
      pool.query<IGetCefinRatioResult>(getCefinRatio, [year, isRealm]),
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
      localCode: Type.Number(),
      isRealm: Type.Boolean(),
      centerRealmOrSector: Type.Array(Type.String()),
      localRealmOrSector: Type.Number(),
      year: Type.Number(),
    }),
  }

  const localCodes = Object.keys(locals).map((key) => +key)

  fastify.get('/analysis/flow', { schema: schema2 }, async (req, reply) => {
    const { localCode, isRealm, centerRealmOrSector, localRealmOrSector, year } = req.query

    if (year > 2023 || year < 2000) throw BadRequestError('Invalid `year`')
    if (!localCodes.includes(localCode)) throw BadRequestError('Invalid `localCode`')

    const [{ rowCount, rows }, { rowCount: rowCount2, rows: rows2 }] = await Promise.all([
      pool.query<IGetLofinByDistrictResult>(getLofinByDistrict, [
        localCode,
        isRealm,
        localRealmOrSector,
        `${year}-01-01`,
        `${year}-12-31`,
      ]),
      pool.query<IGetCefinByOfficeResult>(getCefinByOffice, [isRealm, centerRealmOrSector, year]),
    ])
    if (rowCount === 0 || rowCount2 === 0)
      throw NotFoundError('No analytics could be found that satisfies these conditions...')

    return {
      lofin: {
        예산현액: rows[0].budget_crntam,
        국비: rows[0].nxndr,
        시도비: rows[0].cty,
        시군구비: rows[0].signgunon,
        기타: rows[0].etc_crntam,
        지출액: rows[0].expndtram,
        편성액: rows[0].orgnztnam,
      },
      cefin: rows2,
    }
  })
}
