import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import Fastify from 'fastify'

import {
  K_SERVICE,
  LOCALHOST_HTTPS_CERT,
  LOCALHOST_HTTPS_KEY,
  NODE_ENV,
  PORT,
  PROJECT_ENV,
} from '../common/constants'
import expenditureRoute from './expenditure'

const fastify = Fastify({
  // logger: NODE_ENV === 'development',
  http2: true,

  ...(LOCALHOST_HTTPS_KEY &&
    LOCALHOST_HTTPS_CERT && {
      https: {
        key: `-----BEGIN PRIVATE KEY-----\n${LOCALHOST_HTTPS_KEY}\n-----END PRIVATE KEY-----`,
        cert: `-----BEGIN CERTIFICATE-----\n${LOCALHOST_HTTPS_CERT}\n-----END CERTIFICATE-----`,
        allowHTTP1: true,
      },
    }),
}).withTypeProvider<TypeBoxTypeProvider>()

export type TFastify = typeof fastify

fastify.register(cors, {
  origin: [
    'http://localhost:3000',
    'https://yeou.app',
    'https://yeou.vercel.app',
    'https://yeou-git-dev-gwak2837.vercel.app',
    /^https:\/\/yeou-[a-z0-9]{1,20}-gwak2837\.vercel\.app/,
  ],
})

fastify.register(rateLimit, {
  ...(NODE_ENV === 'development' && {
    allowList: ['127.0.0.1'],
  }),
})

fastify.register(multipart, {
  limits: {
    fileSize: 10_000_000,
    fieldSize: 1_000,
    files: 10,
  },
})

const schema = {
  schema: {
    querystring: Type.Object({
      foo: Type.Optional(Type.Number()),
      bar: Type.Optional(Type.String()),
    }),
    response: {
      200: Type.Object({
        hello: Type.String(),
        foo: Type.Optional(Type.Number()),
        bar: Type.Optional(Type.String()),
      }),
    },
  },
}

fastify.get('/', schema, async (request, _) => {
  const { foo, bar } = request.query
  return { hello: 'world', foo, bar }
})

fastify.register(expenditureRoute)

export default async function startServer() {
  try {
    return await fastify.listen({
      port: +PORT,
      host: K_SERVICE || PROJECT_ENV === 'local-docker' ? '0.0.0.0' : 'localhost',
    })
  } catch (err) {
    console.error(err)
    throw new Error()
  }
}
