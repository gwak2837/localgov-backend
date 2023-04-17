import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import getCenterExpenditureByOffice from './sql/getCenterExpenditureByOffice.sql'
import getCenterExpenditures from './sql/getCenterExpenditures.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
    }),
  }

  fastify.get('/expenditure/center', { schema }, async (req) => {
    const { dateFrom, dateTo } = req.query

    const { rowCount, rows } = await pool.query(getCenterExpenditures, [dateFrom, dateTo])

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows.map((row) => ({
        officeName: row.OFFC_NM,
        budgetSum: row.Y_YY_DFN_MEDI_KCUR_AMT_SUM,
      })),
    }
  })

  const schema2 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),

      // undefined: 전체
      officeName: Type.String(),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/center/office', { schema: schema2 }, async (req) => {
    const { dateFrom, dateTo, officeName, count } = req.query

    if (count && count > 100) throw BadRequestError('Invalid `count`')

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    const { rowCount, rows } = await pool.query(getCenterExpenditureByOffice, [
      dateFrom,
      dateTo,
      officeName,
      count ?? 20,
    ])

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows.map((row) => ({
        sectorName: row.SACTV_NM,
        budgetSum: row.Y_YY_DFN_MEDI_KCUR_AMT_SUM,
      })),
    }
  })
}
