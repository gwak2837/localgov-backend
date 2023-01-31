import { Type } from '@sinclair/typebox'

import { BadRequestError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import { IGetExpendituresResult } from './sql/getExpenditures'
import getExpenditures from './sql/getExpenditures.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      localCode: Type.String(),
      date: Type.String(),
      projectCode: Type.Array(Type.String()),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure', { schema }, async (req, reply) => {
    const querystring = req.query

    const date = Date.parse(querystring.date)
    if (isNaN(date)) throw BadRequestError('Invalid format of `date`')

    const { rows } = await pool.query<IGetExpendituresResult>(getExpenditures, [
      querystring.localCode,
      new Date(date),
      querystring.projectCode,
      querystring.count ?? 20,
    ])

    return rows
  })
}
