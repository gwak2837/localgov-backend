import { Type } from '@sinclair/typebox'

import { NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import getCommitments from './sql/getCommitments.sql'
import getCompletionRatio from './sql/getCompletionRatio.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      basisDate: Type.Optional(Type.String()),
      showRatio: Type.Optional(Type.Boolean()),
      fiscalYears: Type.Optional(Type.Array(Type.Number())),
      localCodes: Type.Optional(Type.Array(Type.Number())),
    }),
  }

  fastify.get('/commitment', { schema }, async (req, reply) => {
    const { basisDate, fiscalYears, localCodes, showRatio } = req.query

    const [_, __] = await Promise.all([
      pool.query(getCommitments, [basisDate, localCodes]),
      pool.query(getCompletionRatio, [basisDate, fiscalYears, localCodes]),
    ])

    if (_.rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    const commitments = _.rows
    const completionRatios = __.rows

    const uniqueCommitmentIds = Array.from(new Set(commitments.map((commitment) => commitment.id)))

    return uniqueCommitmentIds.map((id) => {
      const commitmentsById = commitments.filter((commitment) => commitment.id === id)
      const uniqueDates = Array.from(new Set(commitmentsById.map((s) => s.basis_date.getTime())))
      const maxDate = findMaxDate(uniqueDates.map((d) => new Date(d)))

      const prevExpenditure = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() !== maxDate.getTime() && commitment.category === 1
      )
      const prevExecution = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() !== maxDate.getTime() && commitment.category === 2
      )
      const expenditure = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() === maxDate.getTime() && commitment.category === 1
      )
      const execution = commitmentsById.find(
        (commitment) =>
          commitment.basis_date.getTime() === maxDate.getTime() && commitment.category === 2
      )

      const ratiosById = completionRatios.filter((ratio) => ratio.id === id)

      const expenditure2 = ratiosById.find((ratio) => ratio.category === 1)
      const execution2 = ratiosById.find((ratio) => ratio.category === 2)

      return {
        id,
        title: commitmentsById[0].title,
        basisDate,
        prevTotalExpenditure: getFixedNumber(prevExpenditure?.total, 0),
        prevTotalExecution: getFixedNumber(prevExecution?.total, 0),
        prevExpenditureGovRatio: getFixedNumber(prevExpenditure?.gov_ratio),
        prevExecutionGovRatio: getFixedNumber(prevExecution?.gov_ratio),
        totalExpenditure: getFixedNumber(expenditure?.total, 0),
        totalExecution: getFixedNumber(execution?.total, 0),
        expenditureGovRatio: getFixedNumber(expenditure?.gov_ratio),
        executionGovRatio: getFixedNumber(execution?.gov_ratio),
        selectedExpenditure: getFixedNumber(expenditure2?.total, 0),
        selectedExecution: getFixedNumber(execution2?.total, 0),

        ...(showRatio && {
          expenditureChangeRatio: getFixedNumber(
            (100 * (expenditure?.total - prevExpenditure?.total)) / prevExpenditure?.total
          ),
          excutionChangeRatio: getFixedNumber(
            (100 * (execution?.total - prevExecution?.total)) / prevExecution?.total
          ),
          prevExecutionRatio: getFixedNumber((100 * prevExecution?.total) / prevExpenditure?.total),
          executionRatio: getFixedNumber((100 * execution?.total) / expenditure?.total),
          completionRatio: getFixedNumber((100 * execution2?.total) / expenditure2?.total),
        }),
      }
    })
  })
}

function findMaxDate(dates: Date[]) {
  let maxDate = dates[0] // 첫 번째 날짜를 최대 날짜 초기값으로 설정

  for (let i = 1; i < dates.length; i++) {
    if (dates[i] > maxDate) {
      maxDate = dates[i] // 새로운 최대 날짜를 찾았을 때 업데이트
    }
  }

  return maxDate
}

function getFixedNumber(a: number | string, fractionDigits = 1) {
  return a === 0 ? 0 : a ? +(+a).toFixed(fractionDigits) : undefined
}
