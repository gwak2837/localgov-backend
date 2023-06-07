/* eslint-disable no-console */
import { networkInterfaces } from 'os'

import { NODE_ENV, PGURI, PORT, REDIS_CONNECTION_STRING } from './common/constants'
import { pool } from './common/postgres'
import { startRedisClient } from './common/redis'
import startServer from './routes'

const nets = networkInterfaces()

pool
  .query('SELECT CURRENT_TIMESTAMP')
  .then(({ rows }) =>
    console.log(
      `🚅 Connected to ${PGURI} at ${new Date(rows[0].current_timestamp).toLocaleString()}`
    )
  )
  .catch((error) => {
    throw new Error('Cannot connect to PostgreSQL server... \n' + error)
  })

// startRedisClient()
//   .then((value) =>
//     console.log(`📮 Connected to ${REDIS_CONNECTION_STRING} at ${value.toLocaleString()}`)
//   )
//   .catch((error) => {
//     console.error('Cannot connect to Redis server... \n' + error)
//   })

startServer()
  .then((url) => {
    console.log(`🚀 Server ready at: ${url}`)
    if (NODE_ENV !== 'production' && nets.en0)
      console.log(`🚀 On Your Network: https://${nets.en0[1].address}:${PORT}`)
  })
  .catch((error) => {
    throw new Error('Cannot start API server... \n' + error)
  })
