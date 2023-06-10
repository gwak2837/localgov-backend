import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import {
  lofinRealms,
  lofinSectors,
  sido,
  sidoCodes,
  sigungu,
  sigunguCodes,
} from '../../common/lofin'
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

      localCode: Type.Optional(Type.Number()),
      isRealm: Type.Optional(Type.Boolean()),
    }),
  }

  fastify.get('/analytics/ratio', { schema }, async (req, reply) => {
    // Validate the querystring
    const { dateFrom, dateTo, localCode, isRealm: isRealm_ } = req.query
    const isRealm = isRealm_ ?? false

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    if (localCode && !sidoCodes.includes(localCode) && !sigunguCodes.includes(localCode))
      throw BadRequestError('Invalid `localCode`')

    // Query SQL
    const [{ rows, rowCount }, { rows: rows2, rowCount: rowCount2 }] = await Promise.all([
      pool.query<IGetCefinRatioResult>(getCefinRatio, [
        dateFrom.slice(0, 4),
        dateTo.slice(0, 4),
        isRealm,
      ]),
      pool.query<IGetLofinRatioResult>(getLofinRatio, [dateFrom, dateTo, localCode, isRealm]),
    ])
    if (rowCount === 0 || rowCount2 === 0)
      throw NotFoundError('No analytics could be found that satisfies these conditions...')

    // 예산 단위: 백만
    const results = [{ type: '중앙정부' } as any]

    for (const cefin of rows) {
      if (!cefin.field_or_sector || !cefin.y_yy_dfn_medi_kcur_amt) continue
      results[0][cefin.field_or_sector] = Math.ceil(+cefin.y_yy_dfn_medi_kcur_amt / 1_000)
    }

    let currentCode

    for (const lofin of rows2) {
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
          type: sigungu[lofin.sfrnd_code ?? localCode ?? 0],
          [realmOrSectorLabel]: Math.ceil(+lofin.budget_crntam / 1_000_000),
        })
      }
    }

    return results.reverse()
  })

  const schema2 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      centerRealmOrSector: Type.Array(Type.String()),
      localRealmOrSector: Type.Array(Type.Number()),

      isRealm: Type.Optional(Type.Boolean()),
      criteria: Type.Optional(
        Type.Union([Type.Literal('nation'), Type.Literal('sido'), Type.Literal('sigungu')])
      ),
    }),
  }

  fastify.get('/analytics/flow', { schema: schema2 }, async (req, reply) => {
    // Validate the querystring
    const {
      dateFrom,
      dateTo,
      centerRealmOrSector: centerRealmOrSector_,
      localRealmOrSector,
      isRealm: isRealm_,
      criteria: criteria_,
    } = req.query

    const centerRealmOrSector = centerRealmOrSector_.map((c) => decodeURIComponent(c))
    const criteria = criteria_ ?? 'sido'
    const isRealm = isRealm_ ?? false

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    // Query SQL
    const [{ rowCount, rows }, { rowCount: rowCount2, rows: rows2 }] = await Promise.all([
      pool.query<IGetCefinByOfficeResult>(getCefinByOffice, [
        dateFrom.slice(0, 4),
        dateTo.slice(0, 4),
        isRealm,
        centerRealmOrSector,
      ]),
      pool.query<IGetLofinByDistrictResult>(getLofinByDistrict, [
        dateFrom,
        dateTo,
        isRealm,
        localRealmOrSector,
      ]),
    ])
    if (rowCount === 0 || rowCount2 === 0)
      throw NotFoundError('No analytics could be found that satisfies these conditions...')

    // 예산 단위: 백만
    const cefin = { seriesName: '중앙부처' } as Record<string, number | string>

    for (const cefinRow of rows) {
      if (!cefinRow.offc_nm || !cefinRow.y_yy_dfn_medi_kcur_amt) continue
      cefin[cefinRow.offc_nm] = Math.ceil(+cefinRow.y_yy_dfn_medi_kcur_amt / 1_000)
    }

    const lofin = { seriesName: '지자체' } as Record<string, any>

    for (const lofinRow of rows2) {
      if (!lofinRow.budget_crntam) continue
      const key =
        criteria === 'sigungu'
          ? sigungu[lofinRow.sfrnd_code]
          : criteria === 'sido'
          ? sido[Math.floor(lofinRow.sfrnd_code / 100_000)]
          : '전국'
      if (!lofin[key]) lofin[key] = 0

      lofin[key] += Math.ceil(+lofinRow.budget_crntam / 1_000_000)
    }

    return {
      amchart: [cefin, lofin],
      analytics: {
        cefin: rows.map((cefinRow) => ({
          offc_nm: cefinRow.offc_nm,
          y_yy_dfn_medi_kcur_amt: +(cefinRow.y_yy_dfn_medi_kcur_amt ?? 0) * 1000,
          y_yy_medi_kcur_amt: +(cefinRow.y_yy_medi_kcur_amt ?? 0) * 1000,
        })),
        lofin: rows2.map((lofinRow) => ({ ...lofinRow, sfrnd_name: sigungu[lofinRow.sfrnd_code] })),
      },
    }
  })
}
