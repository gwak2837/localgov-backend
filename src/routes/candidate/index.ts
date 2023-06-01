import { Type } from '@sinclair/typebox'

import { decodeElectionTypeCode } from '../../common/election'
import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import createCandidate from './sql/createCandidate.sql'
import deleteCandidates from './sql/deleteCandidates.sql'
import { IGetCandidatesResult } from './sql/getCandidates'
import getCandidates from './sql/getCandidates.sql'
import updateCandidate from './sql/updateCandidate.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({}),
  }

  fastify.get('/candidate', { schema }, async (req, reply) => {
    const { rows } = await pool.query<IGetCandidatesResult>(getCandidates)

    return {
      candidates: rows.map((candidate) => ({
        id: candidate.id,
        sgId: candidate.sgid,
        sgTypecode: candidate.sgtypecode,
        sgName: decodeElectionTypeCode(candidate.sgtypecode),
        sidoName: candidate.sidoname,
        sigunguName: candidate.sggname,
        wiwName: candidate.wiwname,
        partyName: candidate.partyname,
        krName: candidate.krname,
      })),
    }
  })

  const schema2 = {
    body: Type.Object({
      sgId: Type.Number(),
      sgTypecode: Type.Number(),
      sggName: Type.String(),
      sidoName: Type.String(),
      wiwName: Type.Optional(Type.String()),
      partyName: Type.Optional(Type.String()),
      krName: Type.String(),
    }),
  }

  fastify.post('/candidate', { schema: schema2 }, async (req, reply) => {
    const { sgId, sgTypecode, sggName, sidoName, wiwName, partyName, krName } = req.body

    if (String(sgId).length !== 8) throw BadRequestError('Invalid `sgId`')
    if (![1, 2, 3, 4, 11].includes(sgTypecode)) throw BadRequestError('Invalid `sgTypecode`')

    const { rowCount, rows } = await pool.query(createCandidate, [
      sgId,
      sgTypecode,
      sggName,
      sidoName,
      wiwName,
      partyName,
      krName,
    ])
    if (rowCount === 0) throw BadRequestError('Failed to create a commitment')

    return { id: rows[0].id }
  })

  const schema3 = {
    body: Type.Object({
      id: Type.Number(),
      sgId: Type.Number(),
      sgTypecode: Type.Number(),
      sggName: Type.String(),
      sidoName: Type.String(),
      wiwName: Type.Optional(Type.String()),
      partyName: Type.Optional(Type.String()),
      krName: Type.String(),
    }),
  }

  fastify.put('/candidate', { schema: schema3 }, async (req, reply) => {
    const { id, sgId, sgTypecode, sggName, sidoName, wiwName, partyName, krName } = req.body

    if (String(sgId).length !== 8) throw BadRequestError('Invalid `sgId`')
    if (![1, 3, 4, 11].includes(sgTypecode)) throw BadRequestError('Invalid `sgTypecode`')

    const { rowCount } = await pool.query(updateCandidate, [
      id,
      sgId,
      sgTypecode,
      sggName,
      sidoName,
      wiwName,
      partyName,
      krName,
    ])
    if (rowCount === 0) throw NotFoundError('No rows were affected')

    return { updatedRowCount: rowCount }
  })

  const schema4 = {
    querystring: Type.Object({
      ids: Type.Array(Type.Number()),
    }),
  }

  fastify.delete('/candidate', { schema: schema4 }, async (req, reply) => {
    const { ids } = req.query

    const { rowCount } = await pool.query(deleteCandidates, [ids])
    if (rowCount === 0) throw NotFoundError('No rows were affected')

    return { deletedRowCount: rowCount }
  })
}
