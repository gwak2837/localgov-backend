import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import { IGetExpendituresResult } from './sql/getExpenditures'
import getExpenditures from './sql/getExpenditures.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      localCode: Type.String(),
      date: Type.String(),
      projectCodes: Type.Array(Type.String()),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure', { schema }, async (req, reply) => {
    const querystring = req.query

    const date = Date.parse(querystring.date)
    if (isNaN(date)) throw BadRequestError('Invalid format of `date`')

    const { rowCount, rows } = await pool.query<IGetExpendituresResult>(getExpenditures, [
      querystring.localCode,
      new Date(date),
      querystring.projectCodes,
      querystring.count ?? 20,
    ])

    if (rowCount === 0) throw NotFoundError('No expenditure')

    return rows
  })
}
