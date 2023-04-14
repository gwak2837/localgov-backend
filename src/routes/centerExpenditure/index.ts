import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { locals, provinces, realms, sectors } from '../../common/lofin'
import { pool } from '../../common/postgres'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      date: Type.String(),
      localGovCode: Type.Optional(Type.Number()),
      selectAllLocalGov: Type.Optional(Type.Boolean()),
      projectCodes: Type.Optional(Type.Array(Type.String())),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/expenditure/center', { schema }, async (req) => {
    return ''
  })
}
