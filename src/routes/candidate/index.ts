import { Type } from '@sinclair/typebox'

import { pool } from '../../common/postgres'
import getCandidates from './sql/getCandidates.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/candidate', { schema }, async (req, reply) => {
    const { rows } = await pool.query(getCandidates)

    return { candidates: rows }
  })
}
