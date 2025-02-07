import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import Fastify from 'fastify'
import { FastifySSEPlugin } from 'fastify-sse-v2'
import fastifyJWT from '@fastify/jwt'

import {
  JWT_SECRET_KEY,
  K_SERVICE,
  LOCALHOST_HTTPS_CERT,
  LOCALHOST_HTTPS_KEY,
  NODE_ENV,
  PORT,
  PROJECT_ENV,
} from '../common/constants'
import amchart from './analysis'
import candidate from './candidate'
import centerExpenditure from './centerExpenditure'
import commitment from './commitment'
import commitment2 from './commitment2'
import localExpenditure from './localExpenditure'
import smartplus from './smartplus'

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
    'localhost',
    'localhost:3000',
    'http://localhost:3000',
    'http://localhost:3002',
    'https://jikida.app',
    'https://jikida.vercel.app',
    'https://jikida-git-dev-gwak2837.vercel.app',
    /^https:\/\/jikida-[a-z0-9]{1,20}-gwak2837\.vercel\.app/,
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

fastify.register(fastifyJWT, {
  secret: JWT_SECRET_KEY,
  sign: {
    expiresIn: '3d',
  },
  verify: {
    algorithms: ['HS256'],
  },
})

type QuerystringJWT = {
  Querystring: {
    jwt?: string
  }
}

fastify.addHook<QuerystringJWT>('onRequest', async (req, reply) => {
  const jwt = req.headers.authorization ?? req.query.jwt
  if (!jwt) return

  req.headers.authorization = jwt

  try {
    await req.jwtVerify()
    // const verifiedJwt = await request.jwtVerify()
    // if (!verifiedJwt.iat) throw UnauthorizedError('다시 로그인 해주세요')

    // const logoutTime = await redisClient.get(`${verifiedJwt.userId}:logoutTime`)
    // if (Number(logoutTime) > Number(verifiedJwt.iat) * 1000)
    //   throw UnauthorizedError('다시 로그인 해주세요')
  } catch (err) {
    reply.send(err)
  }
})

fastify.register(FastifySSEPlugin)

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

fastify.register(amchart)
fastify.register(candidate)
fastify.register(centerExpenditure)
fastify.register(commitment2)
fastify.register(commitment)
fastify.register(localExpenditure)
fastify.register(smartplus)

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
