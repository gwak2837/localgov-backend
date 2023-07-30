import { Type } from '@sinclair/typebox'

import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      count: Type.Optional(Type.Number()),
    }),
    body: Type.Object({
      count: Type.Optional(Type.Number()),
    }),
  }

  fastify.get('/chat', (request, reply) => {
    console.log('👀 - connect')

    const headers = reply.getHeaders()

    for (const key in headers) {
      const value = headers[key]
      if (value) {
        reply.raw.setHeader(key, value)
      }
    }

    reply.raw.setHeader('Content-Type', 'text/event-stream')
    reply.raw.setHeader('content-encoding', 'identity')
    reply.raw.setHeader('Cache-Control', 'no-cache,no-transform')
    reply.raw.setHeader('x-no-compression', 1)

    const a = setInterval(() => {
      const time = new Date().toISOString()
      console.log('👀 - message', time)
      reply.raw.write(`time: ${time}`)
    }, 1000)

    request.raw.addListener('close', () => {
      console.log('👀 - close2')
      clearInterval(a)
    })

    request.raw.on('close', () => {
      console.log('👀 - close')
      clearInterval(a)
    })
  })
}
