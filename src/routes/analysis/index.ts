import { Type } from '@sinclair/typebox'
import fetch from 'node-fetch'

import { bot } from '../../common/bard'
import {
  GOOGLE_API_KEY,
  GOOGLE_SEARCH_ENGINE_ID,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
} from '../../common/constants'
import { BadRequestError, NotFoundError } from '../../common/fastify'
import {
  lofinFields,
  lofinSectors,
  sido,
  sidoCodes,
  sigungu,
  sigunguCodes,
} from '../../common/lofin'
import { pool } from '../../common/postgres'
import { nationalTasks120 } from '../../common/president'
import { IGetCefinBusinessResult } from './sql/getCefinBusiness'
import getCefinBusiness from './sql/getCefinBusiness.sql'
import { IGetCefinByOfficeResult } from './sql/getCefinByOffice'
import getCefinByOffice from './sql/getCefinByOffice.sql'
import { IGetCefinRatioResult } from './sql/getCefinRatio'
import getCefinRatio from './sql/getCefinRatio.sql'
import { IGetLofinBusinessResult } from './sql/getLofinBusiness'
import getLofinBusiness from './sql/getLofinBusiness.sql'
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
      isField: Type.Optional(Type.Boolean()),
    }),
  }

  fastify.get('/analytics/ratio', { schema }, async (req, reply) => {
    // Validate the querystring
    const { dateFrom, dateTo, localCode, isField: isField_ } = req.query
    const isField = isField_ ?? false

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
        isField,
      ]),
      pool.query<IGetLofinRatioResult>(getLofinRatio, [dateFrom, dateTo, localCode, isField]),
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

      const realmOrSectorLabel = isField
        ? lofinFields[lofin.realm_or_sect_code]
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
      centerFieldOrSector: Type.Array(Type.String()),
      localFieldOrSector: Type.Array(Type.Number()),

      isField: Type.Optional(Type.Boolean()),
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
      centerFieldOrSector: centerFieldOrSector_,
      localFieldOrSector,
      isField: isField_,
      criteria: criteria_,
    } = req.query

    const centerFieldOrSector = centerFieldOrSector_.map((c) => decodeURIComponent(c))
    const criteria = criteria_ ?? 'sido'
    const isField = isField_ ?? false

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
        isField,
        centerFieldOrSector,
      ]),
      pool.query<IGetLofinByDistrictResult>(getLofinByDistrict, [
        dateFrom,
        dateTo,
        isField,
        localFieldOrSector,
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

  const schema3 = {
    querystring: Type.Object({
      id: Type.String(),
      nationalTaskId: Type.Number(),

      isCefin: Type.Optional(Type.Boolean()),
    }),
  }

  fastify.get('/analytics/business', { schema: schema3 }, async (req, reply) => {
    // Validate the querystring
    const { id, nationalTaskId, isCefin } = req.query

    if (isCefin) {
      const { rows } = await pool.query<IGetCefinBusinessResult>(getCefinBusiness, [id])

      const searchQuery = `${rows[0].offc_nm} ${rows[0].sactv_nm}`
      // const business = {
      //   officeName: rows[0].offc_nm,
      //   name: rows[0].sactv_nm,
      //   field: rows[0].fld_nm,
      //   sector: rows[0].sect_nm,
      // }

      const [naver, youtube, google] = await Promise.all([
        searchFromNaver(searchQuery),
        searchFromYouTube(searchQuery),
        searchFromGoogle(searchQuery),
      ])

      return {
        nationalTask: nationalTasks120[nationalTaskId],
        business: rows[0],
        naver,
        youtube,
        google,
      }
    } else {
      const { rows } = await pool.query<IGetLofinBusinessResult>(getLofinBusiness, [id])

      const sidoCode = +`${rows[0].sfrnd_code}`.slice(0, 2)
      const searchQuery = `${sido[sidoCode]} ${rows[0].detail_bsns_nm}`
      // const business = {
      //   officeName: sigungu[rows[0].sfrnd_code],
      //   name: rows[0].detail_bsns_nm,
      //   field: lofinFields[rows[0].realm_code],
      //   sector: lofinSectors[rows[0].sect_code],
      // }

      const [naver, youtube, google] = await Promise.all([
        // bot.ask(getPrompt(nationalTaskId, business, true, false), String(Date.now() + 2)),
        // bot.ask(getPrompt(nationalTaskId, business, false, false), String(Date.now() + 3)),
        searchFromNaver(searchQuery),
        searchFromYouTube(searchQuery),
        searchFromGoogle(searchQuery),
      ])

      return {
        nationalTask: nationalTasks120[nationalTaskId],
        business: rows[0],
        naver,
        youtube,
        google,
      }
    }
  })
}

async function searchFromNaver(query: string) {
  const response = await fetch(
    `https://openapi.naver.com/v1/search/webkr.json?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    }
  )
  const result = (await response.json()) as any
  return result.items
}

async function searchFromYouTube(query: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&key=${GOOGLE_API_KEY}&regionCode=KR&q=${query}`
  )
  const result = (await response.json()) as any
  return result.items
}

async function searchFromGoogle(query: string) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&q=${query}&cx=${GOOGLE_SEARCH_ENGINE_ID}`
  )
  const result = (await response.json()) as any
  return result.items
}

function getPrompt(
  nationalTaskId: number,
  business: Record<string, any>,
  isPositive: boolean,
  isCenter: boolean
) {
  const officeName = business.officeName

  const prefix = isCenter
    ? isPositive
      ? `대한민국 윤석열 대통령의 120대 국정과제 중 하나와 중앙부처인 ${officeName}에서 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 국정과제와 지방자치단체 사업은 서로 밀접하게 연관되어 있는데, 그 근거를 자세히 설명해줘:`
      : `대한민국 윤석열 대통령의 120대 국정과제 중 하나와 중앙부처인 ${officeName}에서 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 국정과제와 지방자치단체 사업은 서로 하나도 연관되어 있지 않는데, 그 근거를 자세히 설명해줘:`
    : isPositive
    ? `대한민국 윤석열 대통령의 120대 국정과제 중 하나와 대한민국 지방자치단체인 ${officeName}에서 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 국정과제와 지방자치단체 사업은 서로 밀접하게 연관되어 있는데, 그 근거를 자세히 설명해줘:`
    : `대한민국 윤석열 대통령의 120대 국정과제 중 하나와 대한민국 지방자치단체인 ${officeName}에서 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 국정과제와 지방자치단체 사업은 서로 하나도 연관되어 있지 않는데, 그 근거를 자세히 설명해줘:`

  const detail = isCenter
    ? `중앙부처 사업:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${officeName}
- 제목: ${business.name}`
    : `지방자치단체 사업:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${officeName}
- 제목: ${business.name}`

  return `${prefix}

대통령 국정과제:
${nationalTasks120[nationalTaskId]}

${detail}
`
}
