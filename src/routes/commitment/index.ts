import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import { ICreateCommitmentResult } from './sql/createCommitment'
import createCommitment from './sql/createCommitment.sql'
import deleteCommitments from './sql/deleteCommitments.sql'
import { IGetCommitmentsResult } from './sql/getCommitments'
import getCommitments from './sql/getCommitments.sql'
import updateCommitments from './sql/updateCommitments.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      sido: Type.Optional(Type.String()),
      sigungu: Type.Optional(Type.String()),
      voteType: Type.Optional(Type.Number()),
      name: Type.Optional(Type.String()),
      lastId: Type.Optional(Type.Number()),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/commitment', { schema }, async (req) => {
    const { dateFrom, dateTo, sido, sigungu, voteType, name, lastId, count } = req.query

    const { rowCount, rows } = await pool.query<IGetCommitmentsResult>(getCommitments, [
      lastId ?? Number.MAX_SAFE_INTEGER,
      dateFrom,
      dateTo,
      sido,
      sigungu,
      voteType,
      name,
      count ?? 20,
    ])
    if (rowCount === 0) throw NotFoundError('No result')

    return { commitments: rows }
  })

  const schema2 = {
    body: Type.Object({
      realm: Type.String(),
      title: Type.String(),
      content: Type.String(),
      candidateId: Type.Number(),
    }),
  }

  fastify.post('/commitment', { schema: schema2 }, async (req, reply) => {
    const { realm, title, content, candidateId } = req.body

    const { rowCount, rows } = await pool.query<ICreateCommitmentResult>(createCommitment, [
      realm,
      title,
      content,
      candidateId,
    ])
    if (rowCount === 0) throw BadRequestError('Failed to create a commitment')

    return { id: rows[0].id }
  })

  const schema3 = {
    body: Type.Object({
      ids: Type.Array(Type.Number()),
      realms: Type.Array(Type.String()),
      titles: Type.Array(Type.String()),
      contents: Type.Array(Type.String()),
    }),
  }

  fastify.put('/commitment', { schema: schema3 }, async (req, reply) => {
    const { ids, realms, titles, contents } = req.body

    const { rowCount } = await pool.query(updateCommitments, [ids, realms, titles, contents])
    if (rowCount === 0) throw NotFoundError('No rows were affected')

    return { updatedRowCount: rowCount }
  })

  const schema4 = {
    querystring: Type.Object({
      ids: Type.Array(Type.Number()),
    }),
  }

  fastify.delete('/commitment', { schema: schema4 }, async (req, reply) => {
    const { ids } = req.query

    const { rowCount } = await pool.query(deleteCommitments, [ids])
    if (rowCount === 0) throw NotFoundError('No rows were affected')

    return { deletedRowCount: rowCount }
  })
}
