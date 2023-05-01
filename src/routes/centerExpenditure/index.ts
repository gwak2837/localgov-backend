import { Type } from '@sinclair/typebox'

import { officeNames } from '../../common/cefin'
import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import { IGetCenterExpenditureByOfficeResult } from './sql/getCenterExpenditureByOffice'
import getCenterExpenditureByOffice from './sql/getCenterExpenditureByOffice.sql'
import { IGetCenterExpendituresResult } from './sql/getCenterExpenditures'
import getCenterExpenditures from './sql/getCenterExpenditures.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/center', { schema }, async (req) => {
    const { dateFrom, dateTo, count } = req.query

    // Request validation
    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    // SQL
    const { rowCount, rows } = await pool.query<IGetCenterExpendituresResult>(
      getCenterExpenditures,
      [dateFrom, dateTo, count ?? 30]
    )

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows,
    }
  })

  const schema2 = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      officeName: Type.String(),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/center/office', { schema: schema2 }, async (req) => {
    const { dateFrom, dateTo, officeName, count } = req.query

    // Request validation
    if (count && count > 100) throw BadRequestError('Invalid `count`')

    const dateFrom2 = Date.parse(dateFrom)
    if (isNaN(dateFrom2)) throw BadRequestError('Invalid `dateFrom`')

    const dateTo2 = Date.parse(dateTo)
    if (isNaN(dateTo2)) throw BadRequestError('Invalid `dateTo`')

    if (dateFrom2 > dateTo2) throw BadRequestError('Invalid `dateFrom`')

    if (!officeNames.includes(officeName)) throw BadRequestError('Invalid `officeName`')

    // SQL
    const { rowCount, rows } = await pool.query<IGetCenterExpenditureByOfficeResult>(
      getCenterExpenditureByOffice,
      [dateFrom, dateTo, officeName, count ?? 20]
    )

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      expenditures: rows,
    }
  })
}
