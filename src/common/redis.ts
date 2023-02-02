import { createClient } from 'redis'

import {
  REDIS_CA,
  REDIS_CLIENT_CERT,
  REDIS_CLIENT_KEY,
  REDIS_CONNECTION_STRING,
} from '../common/constants'

export const redisClient = createClient({
  url: REDIS_CONNECTION_STRING,

  ...(REDIS_CA &&
    REDIS_CLIENT_KEY &&
    REDIS_CLIENT_CERT && {
      socket: {
        tls: true,
        ca: `-----BEGIN CERTIFICATE-----\n${REDIS_CA}\n-----END CERTIFICATE-----`,
        key: `-----BEGIN PRIVATE KEY-----\n${REDIS_CLIENT_KEY}\n-----END PRIVATE KEY-----`,
        cert: `-----BEGIN CERTIFICATE-----\n${REDIS_CLIENT_CERT}\n-----END CERTIFICATE-----`,
        checkServerIdentity: () => {
          return undefined
        },
        reconnectStrategy: (retries) => Math.min(retries * 1000, 15_000),
      },
    }),
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))

export async function startRedisClient() {
  await redisClient.connect()
  return redisClient.time()
}
