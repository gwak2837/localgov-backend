// 자동
export const NODE_ENV = process.env.NODE_ENV as string
export const K_SERVICE = process.env.K_SERVICE as string // GCP에서 실행 중일 때
export const CLOUD_RUN_TASK_INDEX = process.env.CLOUD_RUN_TASK_INDEX as string
export const CLOUD_RUN_TASK_COUNT = process.env.CLOUD_RUN_TASK_COUNT as string

// 공통
export const PORT = process.env.PORT as string
export const PROJECT_ENV = process.env.PROJECT_ENV as string
export const FRONTEND_URL = process.env.FRONTEND_URL as string
export const LOFIN_KEY = process.env.LOFIN_KEY

export const PGURI = process.env.PGURI as string

export const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING as string

// 개별
export const LOCALHOST_HTTPS_KEY = process.env.LOCALHOST_HTTPS_KEY as string
export const LOCALHOST_HTTPS_CERT = process.env.LOCALHOST_HTTPS_CERT as string

export const POSTGRES_CA = process.env.POSTGRES_CA as string
export const POSTGRES_CERT = process.env.POSTGRES_CERT as string
export const POSTGRES_KEY = process.env.POSTGRES_KEY as string

export const REDIS_CA = process.env.REDIS_CA as string
export const REDIS_CLIENT_KEY = process.env.REDIS_CLIENT_KEY as string
export const REDIS_CLIENT_CERT = process.env.REDIS_CLIENT_CERT as string
