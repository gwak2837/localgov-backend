import { Type } from '@sinclair/typebox'

import { NotFoundError } from '../../common/fastify'
import { decodeField, lofinSectors } from '../../common/lofin'
import { pool } from '../../common/postgres'
import getBasisDates from './sql/getBasisDates.sql'
import { IGetCommitmentsResult } from './sql/getCommitments'
import getCommitments from './sql/getCommitments.sql'
import { IGetCompletionRatioResult } from './sql/getCompletionRatio'
import getCompletionRatio from './sql/getCompletionRatio.sql'
import getFiscalYears from './sql/getFiscalYears.sql'
import getLocalGovCodes from './sql/getLocalGovCodes.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      electionCategory: Type.Number(),
      localCodes: Type.Array(Type.Number()),

      fiscalYears: Type.Optional(Type.Array(Type.Number())),
      basisDate: Type.Optional(Type.String()),
      showRatio: Type.Optional(Type.Boolean()),
    }),
  }

  fastify.get('/commitment', { schema }, async (req, reply) => {
    const { electionCategory, basisDate, fiscalYears, localCodes, showRatio } = req.query

    const [_, __] = await Promise.all([
      pool.query<IGetCommitmentsResult>(getCommitments, [electionCategory, localCodes, basisDate]),
      pool.query<IGetCompletionRatioResult>(getCompletionRatio, [
        electionCategory,
        localCodes,
        basisDate?.slice(0, 10),
        fiscalYears,
      ]),
    ])

    if (_.rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    const commitments = _.rows
    const completionRatios = __.rows

    const uniqueCommitmentIds = Array.from(new Set(commitments.map((commitment) => commitment.id)))

    return uniqueCommitmentIds.map((id) => {
      const commitmentsById = commitments.filter((commitment) => commitment.id === id)
      const uniqueDates = Array.from(new Set(commitmentsById.map((s) => s.basis_date.getTime())))
      const latestDate = getLatestDate(uniqueDates.map((d) => new Date(d)))

      const prevExpenditure = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() !== latestDate.getTime() &&
          commitment.finance__category === 1
      )
      const prevExecution = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() !== latestDate.getTime() &&
          commitment.finance__category === 2
      )
      const expenditure = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() === latestDate.getTime() &&
          commitment.finance__category === 1
      )
      const execution = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() === latestDate.getTime() &&
          commitment.finance__category === 2
      )

      const ratiosById = completionRatios.filter((ratio) => ratio.id === id)

      const expenditure2 = ratiosById.find((ratio) => ratio.category === 1)
      const execution2 = ratiosById.find((ratio) => ratio.category === 2)

      const commitment = commitmentsById[0]

      return {
        id,
        title: commitment.title,
        field: decodeField[commitment.field_code],
        sector: commitment.sector_code ? lofinSectors[commitment.sector_code] : undefined,
        priority: commitmentsById[0].priority ?? undefined,
        basisDate: expenditure?.basis_date,
        prevTotalExpenditure: getFixedNumber(prevExpenditure?.total, 0),
        prevTotalExecution: getFixedNumber(prevExecution?.total, 0),
        prevExpenditureGovRatio: getFixedNumber(
          (100 * +(prevExpenditure?.gov ?? 0)) / +(prevExpenditure?.total ?? 0)
        ),
        prevExecutionGovRatio: getFixedNumber(
          (100 * +(prevExecution?.gov ?? 0)) / +(prevExecution?.total ?? 0)
        ),
        totalExpenditure: getFixedNumber(expenditure?.total, 0),
        totalExecution: getFixedNumber(execution?.total, 0),
        expenditureGovRatio: getFixedNumber(
          (100 * +(expenditure?.gov ?? 0)) / +(expenditure?.total ?? 0)
        ),
        executionGovRatio: getFixedNumber(
          (100 * +(execution?.gov ?? 0)) / +(execution?.total ?? 0)
        ),
        selectedExpenditure: getFixedNumber(expenditure2?.total, 0),
        selectedExecution: getFixedNumber(execution2?.total, 0),

        ...(showRatio && {
          expenditureChangeRatio: getFixedNumber(
            (100 * (+(expenditure?.total ?? 0) - +(prevExpenditure?.total ?? 0))) /
              +(prevExpenditure?.total ?? 1)
          ),
          excutionChangeRatio: getFixedNumber(
            (100 * (+(execution?.total ?? 0) - +(prevExecution?.total ?? 0))) /
              +(prevExecution?.total ?? 0)
          ),
          prevExecutionRatio: getFixedNumber(
            (100 * +(prevExecution?.total ?? 0)) / +(prevExpenditure?.total ?? 0)
          ),
          executionRatio: getFixedNumber(
            (100 * +(execution?.total ?? 0)) / +(expenditure?.total ?? 0)
          ),
          completionRatio: getFixedNumber(
            (100 * +(execution2?.total ?? 0)) / +(expenditure2?.total ?? 0)
          ),
        }),
      }
    })
  })

  const schema2 = {
    querystring: Type.Object({
      electionCategory: Type.Number(),
    }),
  }

  fastify.get('/commitment/option', { schema: schema2 }, async (req, reply) => {
    const { electionCategory } = req.query

    const [_, __, ___] = await Promise.all([
      pool.query(getBasisDates, [electionCategory]),
      pool.query(getFiscalYears),
      pool.query(getLocalGovCodes, [electionCategory]),
    ])

    return {
      basisDates: _.rows.map((row) => row.basis_date),
      fiscalYears: __.rows.map((row) => row.fiscal_year),
      localCodes: ___.rows.map((row) => row.district),
    }
  })
}

function getLatestDate(dates: Date[]) {
  let maxDate = dates[0] // 첫 번째 날짜를 최대 날짜 초기값으로 설정

  for (let i = 1; i < dates.length; i++) {
    if (dates[i] > maxDate) {
      maxDate = dates[i] // 새로운 최대 날짜를 찾았을 때 업데이트
    }
  }

  return maxDate
}

function getFixedNumber(a: number | string | null | undefined, fractionDigits = 1) {
  return a === 0 ? 0 : a ? +(+a).toFixed(fractionDigits) : undefined
}
