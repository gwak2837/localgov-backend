import { Type } from '@sinclair/typebox'
import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

import { bard } from '../../common/bard'
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
import { presidentCommitments as presCommitments } from '../../common/president'
import createAIResults from './sql/createAIResults.sql'
import getAIResult from './sql/getAIResult.sql'
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
import getPromptFromCefin from './sql/getPromptFromCefin.sql'
import { IGetPromptFromLoComResult } from './sql/getPromptFromLoCom'
import getPromptFromLoCom from './sql/getPromptFromLoCom.sql'
import getPromptFromLoEdu from './sql/getPromptFromLoEdu.sql'
import getPromptFromLofin from './sql/getPromptFromLofin.sql'
import { TFastify } from '..'

enum Category {
  centerExpenditure = 0,
  localExpenditure,
  localCommitment,
  eduCommitment,
}

const CategoryValues = Object.values(Category).filter((v) => !isNaN(Number(v)))

enum AI {
  bard = 0,
  chatGPT3_5,
  chatGPT4,
}

enum PromptKind {
  negative = 0,
  positive,
}

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
      category: Type.Number(),
    }),
  }

  fastify.get('/analytics/business', { schema: schema3 }, async (req, reply) => {
    // Validate the querystring
    const { id, category } = req.query

    if (category === Category.centerExpenditure) {
      const { rows } = await pool.query<IGetCefinBusinessResult>(getCefinBusiness, [id])

      const searchQuery = `${rows[0].offc_nm} ${rows[0].sactv_nm}`

      const [naver, youtube, google] = await Promise.all([
        searchFromNaver(searchQuery),
        searchFromYouTube(searchQuery),
        searchFromGoogle(searchQuery),
      ])

      return {
        naver,
        youtube,
        google,
      }
    } else if (category === Category.localExpenditure) {
      const { rows } = await pool.query<IGetLofinBusinessResult>(getLofinBusiness, [id])

      const sidoCode = +`${rows[0].sfrnd_code}`.slice(0, 2)
      const searchQuery = `${sido[sidoCode]} ${rows[0].detail_bsns_nm}`

      const [naver, youtube, google] = await Promise.all([
        searchFromNaver(searchQuery),
        searchFromYouTube(searchQuery),
        searchFromGoogle(searchQuery),
      ])

      return {
        naver,
        youtube,
        google,
      }
    } else if (category === Category.eduCommitment) {
      const { rows } = await pool.query<IGetLofinBusinessResult>(getLofinBusiness, [id])

      const sidoCode = +`${rows[0].sfrnd_code}`.slice(0, 2)
      const searchQuery = `${sido[sidoCode]} ${rows[0].detail_bsns_nm}`

      const [naver, youtube, google] = await Promise.all([
        searchFromNaver(searchQuery),
        searchFromYouTube(searchQuery),
        searchFromGoogle(searchQuery),
      ])

      return {
        naver,
        youtube,
        google,
      }
    } else if (category === Category.localCommitment) {
      const { rows } = await pool.query<IGetLofinBusinessResult>(getLofinBusiness, [id])

      const sidoCode = +`${rows[0].sfrnd_code}`.slice(0, 2)
      const searchQuery = `${sido[sidoCode]} ${rows[0].detail_bsns_nm}`

      const [naver, youtube, google] = await Promise.all([
        searchFromNaver(searchQuery),
        searchFromYouTube(searchQuery),
        searchFromGoogle(searchQuery),
      ])

      return {
        naver,
        youtube,
        google,
      }
    }
  })

  const schema4 = {
    querystring: Type.Object({
      category: Type.Number(),
      presidentCommitmentId: Type.Number(),
      businessId: Type.Number(),
    }),
  }

  fastify.get('/analytics/ai', { schema: schema4 }, async (req, reply) => {
    const { category, presidentCommitmentId, businessId } = req.query

    if (!CategoryValues.includes(category)) throw BadRequestError('Invalid `category`')

    const promptPromise =
      category === Category.centerExpenditure
        ? pool.query(getPromptFromCefin, [businessId])
        : category === Category.localCommitment
        ? pool.query(getPromptFromLoCom, [businessId])
        : category === Category.eduCommitment
        ? pool.query(getPromptFromLoEdu, [businessId])
        : pool.query(getPromptFromLofin, [businessId])

    const [{ rows }, { rows: rows2, rowCount: rowCount2 }] = await Promise.all([
      promptPromise,
      pool.query(getAIResult, [category, businessId]),
    ])

    if (rowCount2 !== 0) {
      return {
        bard: rows2.filter((row) => row.who === AI.bard),
        chatGPT3: rows2.filter((row) => row.who === AI.chatGPT3_5),
        chatGPT4: rows2.filter((row) => row.who === AI.chatGPT4),
      }
    }

    const businessFromDB = rows[0]

    const business = {
      officeName: businessFromDB.who_name ?? sigungu[businessFromDB.who_code],
      when: businessFromDB.when_
        ? formatKoreanDate(businessFromDB.when_)
        : `${businessFromDB.when_year}년`,
      field: businessFromDB.field ?? lofinFields[businessFromDB.field_code],
      sector: businessFromDB.sector ?? lofinSectors[businessFromDB.sector_code],
      name: businessFromDB.title,
    }

    const prompts = getPrompts(presidentCommitmentId, business, category)

    const [bardPositive, bardNegative] = await Promise.all([
      ...prompts.map((prompt, i) => bard.ask(prompt, uuidv4())),
      ...prompts.map((prompt, i) => 'chatgpt.ask'),
    ])

    pool.query(createAIResults, [
      [AI.bard, AI.bard],
      [category, category],
      [businessId, businessId],
      [PromptKind.positive, PromptKind.negative],
      [bardPositive, bardNegative],
    ])

    return {
      bard: {
        positive: bardPositive,
        negative: bardNegative,
      },
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

function getPrompts(presCommitmentId: number, business: Record<string, any>, category: number) {
  const officeName = business.officeName
  const when = business.when

  const prefixes = (
    category === Category.centerExpenditure
      ? [
          `중앙부처인 ${officeName}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 중앙부처 사업은 서로 밀접하게 연관되어 있는데`,
          `중앙부처인 ${officeName}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 중앙부처 사업은 서로 하나도 연관되어 있지 않는데`,
        ]
      : category === Category.localExpenditure
      ? [
          `대한민국 지방자치단체인 ${officeName}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 지방자치단체 사업은 서로 밀접하게 연관되어 있는데`,
          `대한민국 지방자치단체인 ${officeName}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 지방자치단체 사업은 서로 하나도 연관되어 있지 않는데`,
        ]
      : category === Category.localCommitment
      ? [
          `대한민국 지방자치단체인 ${officeName}에서 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 지방자치단체장 공약은 서로 밀접하게 연관되어 있는데`,
          `대한민국 지방자치단체인 ${officeName}에서 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 지방자치단체장 공약은 서로 하나도 연관되어 있지 않는데`,
        ]
      : [
          `대한민국 ${officeName} 교육감이 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 교육감 공약은 서로 밀접하게 연관되어 있는데`,
          `대한민국 ${officeName} 교육감이 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 대통령 공약과 교육감 공약은 서로 하나도 연관되어 있지 않는데`,
        ]
  ).map(
    (prefix) =>
      `대한민국 윤석열 대통령의 120대 공약 중 하나와 ${prefix}, 연관성 비율과 그 근거를 자세히 설명해줘.`
  )

  const detail = Category.centerExpenditure
    ? `중앙부처 사업:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${officeName}
- 제목: ${business.name}`
    : Category.localExpenditure
    ? `지방자치단체 사업:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${officeName}
- 제목: ${business.name}`
    : Category.localCommitment
    ? `지방자치단체장 공약:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${officeName}
- 제목: ${business.name}`
    : `교육감 공약:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${officeName}
- 제목: ${business.name}`

  return prefixes.map(
    (prefix) => `${prefix}

대통령 국정과제:
${presCommitments[presCommitmentId]}

${detail}`
  )
}

function formatKoreanDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}
