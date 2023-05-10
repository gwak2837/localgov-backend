import { Type } from '@sinclair/typebox'

import { UnauthorizedError } from '../../common/fastify'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      dateFrom: Type.String(),
      dateTo: Type.String(),
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/commitment', { schema }, async (req, reply) => {
    return { hello: 'index' }
  })
}
