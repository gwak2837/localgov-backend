import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { lofinRealms, lofinSectors, sigunguCodes } from '../../common/lofin'
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
      dateFrom: Type.String(),
      dateTo: Type.String(),
      localCode: Type.Optional(Type.Number()), // 기본값: 전국
      isRealm: Type.Optional(Type.Boolean()), // 기본값: 부문
    }),
  }

  fastify.get('/analysis/ratio', { schema }, async (req, reply) => {
    // Validate the querystring
    const { dateFrom, dateTo, localCode, isRealm } = req.query

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    // Query SQL
    const [{ rows }, { rows: rows2 }] = await Promise.all([
      pool.query<IGetLofinRatioResult>(getLofinRatio, [
        dateFrom,
        dateTo,
        localCode,
        isRealm ?? false,
      ]),
      pool.query<IGetCefinRatioResult>(getCefinRatio, [
        dateFrom.slice(0, 4),
        dateTo.slice(0, 4),
        isRealm ?? false,
      ]),
    ])

    const results = [{ type: '중앙정부' } as any]

    for (const cefin of rows2) {
      if (!cefin.sect_nm || !cefin.y_yy_dfn_medi_kcur_amt) continue
      results[0][cefin.sect_nm] = Math.ceil(+cefin.y_yy_dfn_medi_kcur_amt / 1_000)
    }

    let currentCode

    for (const lofin of rows) {
      if (!lofin.realm_or_sect_code || !lofin.budget_crntam) continue

      const realmOrSectorLabel = isRealm
        ? lofinRealms[lofin.realm_or_sect_code]
        : lofinSectors[lofin.realm_or_sect_code]

      if (lofin.sfrnd_code === currentCode) {
        results[results.length - 1][realmOrSectorLabel] = Math.ceil(
          +lofin.budget_crntam / 1_000_000
        )
      } else {
        currentCode = lofin.sfrnd_code
        results.push({
          type: sigunguCodes[lofin.sfrnd_code ?? localCode ?? 0],
          [realmOrSectorLabel]: Math.ceil(+lofin.budget_crntam / 1_000_000),
        })
      }
    }

    return results.reverse()
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

  const localCodes = Object.keys(sigunguCodes).map((key) => +key)

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
