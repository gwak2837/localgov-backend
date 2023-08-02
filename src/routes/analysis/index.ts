/* eslint-disable camelcase */
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
  localCode,
  decodeField,
  lofinSectors,
  sido,
  sidoCodes,
  sigungu,
  sigunguCodes,
  encodeField,
} from '../../common/lofin'
import { pool } from '../../common/postgres'
import createAIResults from './sql/createAIResults.sql'
import getAIResult from './sql/getAIResult.sql'
import { IGetCefinBusinessResult } from './sql/getCefinBusiness'
import getCefinBusiness from './sql/getCefinBusiness.sql'
import { IGetCefinByOfficeResult } from './sql/getCefinByOffice'
import getCefinByOffice from './sql/getCefinByOffice.sql'
import { IGetCefinRatioResult } from './sql/getCefinRatio'
import getCefinRatio from './sql/getCefinRatio.sql'
import { IGetCommitmentResult } from './sql/getCommitment'
import getCommitment from './sql/getCommitment.sql'
import { IGetCommitmentFinResult } from './sql/getCommitmentFin'
import getCommitmentFin from './sql/getCommitmentFin.sql'
import { IGetLofinBusinessResult } from './sql/getLofinBusiness'
import getLofinBusiness from './sql/getLofinBusiness.sql'
import { IGetLofinByDistrictResult } from './sql/getLofinByDistrict'
import getLofinByDistrict from './sql/getLofinByDistrict.sql'
import { IGetLofinRatioResult } from './sql/getLofinRatio'
import getLofinRatio from './sql/getLofinRatio.sql'
import getPromptFromCefin from './sql/getPromptFromCefin.sql'
import getPromptFromComm2 from './sql/getPromptFromComm2.sql'
import getPromptFromComm from './sql/getPromptFromComm.sql'
import getPromptFromLofin from './sql/getPromptFromLofin.sql'
import getRelatedCommitments from './sql/getRelatedCommitments.sql'
import { TFastify } from '..'
import { decodeElectionCategory } from '../../common/election'
import { IGetAiResultResult } from './sql/getAIResult'

enum Category {
  centerExpenditure = 0,
  localExpenditure,
  localCommitment,
}

const CategoryValues = Object.values(Category).filter((v) => !isNaN(Number(v)))

enum AI {
  bard = 0,
  chatGPT3,
  chatGPT3_16K,
  chatGPT4,
}

enum PromptCategory {
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
        ? decodeField[lofin.realm_or_sect_code]
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

  fastify.get('/analytics/business', { schema: schema3 }, async (req, res) => {
    // Validate the querystring
    const { category, id } = req.query

    const { who, when, field, field_code, sector, title, content, finances } =
      await (async (): Promise<any> => {
        if (category === Category.centerExpenditure) {
          const { rows } = await pool.query<IGetCefinBusinessResult>(getCefinBusiness, [id])

          const business = rows[0]
          return {
            who: business.who_name,
            when: `${business.when_year}년`,
            field: business.field,
            field_code: encodeField[+business.field],
            sector: business.sector,
            title: business.title,
            finances: [
              {
                y_prey_first_kcur_amt: business.y_prey_first_kcur_amt,
                y_prey_fnl_frc_amt: business.y_prey_fnl_frc_amt,
                y_yy_medi_kcur_amt: business.y_yy_dfn_medi_kcur_amt,
                y_yy_dfn_medi_kcur_amt: business.y_yy_dfn_medi_kcur_amt,
              },
            ],
          }
        } else if (category === Category.localExpenditure) {
          const { rows } = await pool.query<IGetLofinBusinessResult>(getLofinBusiness, [id])
          const business = rows[0]
          return {
            who: sido[business.who_code],
            when: `${business.when_year}년`,
            field: decodeField[business.field_code],
            field_code: business.field_code,
            sector: lofinSectors[business.sector_code ?? 0],
            title: business.title,
            finances: [
              {
                gov: business.gov,
                sido: business.sido,
                sigungu: business.sigungu,
                etc: business.etc,
                expndtram: business.expndtram,
                orgnztnam: business.orgnztnam,
              },
            ],
          }
        } else {
          const [{ rows }, { rows: rows2 }] = await Promise.all([
            pool.query<IGetCommitmentResult>(getCommitment, [id]),
            pool.query<IGetCommitmentFinResult>(getCommitmentFin, [id]),
          ])
          const commitment = rows[0]
          const finances = rows2

          return {
            who: commitment.who_code
              ? commitment.who_code < 100
                ? sido[commitment.who_code]
                : sigungu[commitment.who_code]
              : undefined,
            when: commitment.when_date
              ? formatKoreanDate(commitment.when_date.toISOString())
              : undefined,
            field: decodeField[commitment.field_code],
            field_code: commitment.field_code,
            sector: lofinSectors[commitment.sector_code ?? 0],
            title: commitment.title,
            content: commitment.content,
            finances,
          }
        }
      })()

    const searchQuery = `${who} ${title}`

    const [naver, youtube, google, relatedCommitments] = await Promise.all([
      searchFromNaver(searchQuery),
      searchFromYouTube(searchQuery),
      searchFromGoogle(searchQuery),
      pool.query(getRelatedCommitments, [field_code ?? 80, id]),
    ])

    return {
      business: {
        who,
        when,
        field,
        sector,
        category,
        title,
        content,
        finances,
      },
      relatedCommitments: relatedCommitments.rows.map((row) => ({
        id: row.id,
        title: row.title,
        content: row.content,
        field: decodeField[row.field_code],
        category: decodeElectionCategory[row.category],
        electionDate: row.election_date,
        district: localCode[row.district],
      })),
      naver: naver.map((n: any) => ({
        link: n.link,
        title: n.title,
        content: n.description,
      })),
      youtube,
      google: google.map((g: any) => ({
        link: g.link,
        title: g.htmlTitle,
        content: g.htmlSnippet,
      })),
    }
  })

  const schema4 = {
    querystring: Type.Object({
      businessId: Type.String(),
      businessCategory: Type.Number(),
      commitmentId: Type.Number(),
    }),
  }

  fastify.get('/analytics/ai', { schema: schema4 }, async (req, reply) => {
    const { businessId, businessCategory, commitmentId } = req.query

    if (!CategoryValues.includes(businessCategory))
      throw BadRequestError('Invalid `businessCategory`')

    const [businessResult, AIResult, commitmentResult] = await Promise.all([
      businessCategory === Category.centerExpenditure
        ? pool.query(getPromptFromCefin, [businessId])
        : businessCategory === Category.localCommitment
        ? pool.query(getPromptFromComm, [businessId])
        : pool.query(getPromptFromLofin, [businessId]),
      pool.query<IGetAiResultResult>(getAIResult, [businessId, businessCategory, commitmentId]),
      pool.query(getPromptFromComm2, [commitmentId]),
    ])

    if (AIResult.rowCount !== 0) {
      const bard = AIResult.rows.filter((row) => row.who === AI.bard)

      return {
        bard: {
          positive: bard.find((row) => row.category === PromptCategory.positive),
          negative: bard.find((row) => row.category === PromptCategory.negative),
        },
        chatGPT3: AIResult.rows.filter((row) => row.who === AI.chatGPT3),
        chatGPT4: AIResult.rows.filter((row) => row.who === AI.chatGPT4),
      }
    }

    const business_ = businessResult.rows[0]

    const business = {
      who:
        business_.who_name ?? business_.who_code === 0
          ? business_.primary_dept
          : business_.who_code < 100
          ? sido[business_.who_code]
          : sigungu[business_.who_code],
      category: businessCategory,
      when: business_.when_ ? formatKoreanDate(business_.when_) : `${business_.when_year}년`,
      field: business_.field ?? decodeField[business_.field_code],
      sector: business_.sector ?? lofinSectors[business_.sector_code] ?? '',
      title: business_.title,
      content: business_.content ?? '',
    }

    const commitment_ = commitmentResult.rows[0]

    const commitment = {
      who:
        commitment_.who_code === 0
          ? commitment_.primary_dept
          : commitment_.who_code < 100
          ? sido[commitment_.who_code]
          : sigungu[commitment_.who_code],
      category: decodeElectionCategory[commitment_.category],
      when: commitment_.when_date
        ? formatKoreanDate(commitment_.when_date.toISOString())
        : '2023년 3월 9일',
      field: decodeField[commitment_.field_code],
      sector: lofinSectors[commitment_.sector_code] ?? '',
      title: commitment_.title,
      content: commitment_.content ?? '',
    }

    const prompts = getPrompts(commitment, business)

    const [bardPositive, bardNegative] = await Promise.all([
      ...prompts.map((prompt, i) => bard.ask(prompt, uuidv4())),
      ...prompts.map((prompt, i) => 'chatgpt.ask'),
    ])

    pool.query(createAIResults, [
      [AI.bard, AI.bard],
      [businessId, businessId],
      [businessCategory, businessCategory],
      [commitmentId, commitmentId],
      [PromptCategory.positive, PromptCategory.negative],
      [bardPositive, bardNegative],
    ])

    const creationDate = new Date()

    return {
      bard: {
        positive: {
          creationDate,
          content: bardPositive,
        },
        negative: {
          creationDate,
          content: bardNegative,
        },
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

function getPrompts(commitment: any, business: Record<string, any>) {
  const who = business.who
  const when = business.when
  const businessCategory = business.category

  const businessTitle =
    businessCategory === Category.centerExpenditure
      ? '중앙부처 사업'
      : businessCategory === Category.localExpenditure
      ? `${who} 지방자치단체 사업`
      : businessCategory === Category.localCommitment
      ? `${who} 지방자치단체장 공약`
      : `${who} 교육감 공약`

  const commitmentCategory = commitment.category

  const businessPrompts =
    businessCategory === Category.centerExpenditure
      ? [
          `중앙부처인 ${who}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있는데`,
          `중앙부처인 ${who}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있지 않는데`,
        ]
      : businessCategory === Category.localExpenditure
      ? [
          `대한민국 지방자치단체인 ${who}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있는데`,
          `대한민국 지방자치단체인 ${who}에서 ${when}에 실시한 사업 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있지 않는데`,
        ]
      : businessCategory === Category.localCommitment
      ? [
          `대한민국 지방자치단체인 ${who}에서 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있는데`,
          `대한민국 지방자치단체인 ${who}에서 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있지 않는데`,
        ]
      : [
          `대한민국 ${who} 교육감이 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있는데`,
          `대한민국 ${who} 교육감이 ${when}에 제시한 공약 간의 연관성을 분석하려고 해. 아래의 ${commitment.who} ${commitmentCategory} 공약과 ${businessTitle}은 서로 연관되어 있지 않는데`,
        ]

  return businessPrompts.map(
    (
      businessPrompt
    ) => `${commitment.who} ${commitmentCategory} 공약과 ${businessPrompt}, 연관성 비율과 그 근거를 자세히 설명해줘.


${commitment.who} ${commitmentCategory} 공약:
- 분야: ${commitment.field}
- 부문: ${commitment.sector}
- 주관: ${commitment.who}
- 제목: ${commitment.title}
- 내용: ${commitment.content}


${businessTitle}:
- 분야: ${business.field}
- 부문: ${business.sector}
- 주관: ${who}
- 제목: ${business.title}
- 내용: ${business.content}
`
  )
}

function formatKoreanDate(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}
