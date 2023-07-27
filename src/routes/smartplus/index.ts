import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { lofinFields, lofinSectors } from '../../common/lofin'
import { pool } from '../../common/postgres'
import createAnswers from './sql/createAnswers.sql'
import getAnswers from './sql/getAnswers.sql'
import getQuestions from './sql/getQuestions.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({}),
  }

  fastify.get('/smartplus/question', { schema }, async (req, reply) => {
    const { rowCount, rows } = await pool.query(getQuestions)

    if (rowCount === 0) throw NotFoundError('No active SMARTPLUS question found')

    return rows
  })

  const schema2 = {
    querystring: Type.Object({
      businessId: Type.String(),
      businessCategory: Type.Number(),
    }),
  }

  fastify.get('/smartplus/answer', { schema: schema2 }, async (req, reply) => {
    const { businessId, businessCategory } = req.query

    const { rowCount, rows } = await pool.query(getAnswers, [businessId, businessCategory])

    if (rowCount === 0) throw NotFoundError('No SMARTPLUS answer found')

    return rows
  })

  const schema3 = {
    querystring: Type.Object({
      answers: Type.Array(Type.Number()),
      businessIds: Type.Array(Type.String()),
      businessCategories: Type.Array(Type.Number()),
      questionIds: Type.Array(Type.String()),
    }),
  }

  fastify.post('/smartplus/answer', { schema: schema3 }, async (req, reply) => {
    const { answers, businessIds, businessCategories, questionIds } = req.query

    const { rowCount } = await pool.query(createAnswers, [
      answers,
      businessIds,
      businessCategories,
      questionIds,
    ])

    if (rowCount === 0) throw BadRequestError('No SMARTPLUS answer found')

    return rowCount
  })
}
