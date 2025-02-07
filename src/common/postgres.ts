import pg from 'pg'

import { NODE_ENV, PGURI, POSTGRES_CA, POSTGRES_CERT, POSTGRES_KEY } from '../common/constants'
import { BadGatewayError } from './fastify'

const { Pool } = pg

export const pool = new Pool({
  connectionString: PGURI,

  ...(POSTGRES_CA &&
    POSTGRES_KEY &&
    POSTGRES_CERT && {
      ssl: {
        ca: `-----BEGIN CERTIFICATE-----\n${POSTGRES_CA}\n-----END CERTIFICATE-----`,
        key: `-----BEGIN PRIVATE KEY-----\n${POSTGRES_KEY}\n-----END PRIVATE KEY-----`,
        cert: `-----BEGIN CERTIFICATE-----\n${POSTGRES_CERT}\n-----END CERTIFICATE-----`,
        checkServerIdentity: () => {
          return undefined
        },
      },
    }),
})

pool.on('error', (err) => {
  if (NODE_ENV === 'production') {
    console.error(err.message)
    throw BadGatewayError('Database query error')
  } else {
    throw BadGatewayError('Database error: ' + err.message)
  }
})
