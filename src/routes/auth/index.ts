import { Type } from '@sinclair/typebox'

import {
  FRONTEND_URL,
  KAKAO_ADMIN_KEY,
  KAKAO_CLIENT_SECRET,
  KAKAO_REST_API_KEY,
} from '../../common/constants'
import { ForbiddenError, UnauthorizedError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import getKakaoUser from './sql/getKakaoUser.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      code: Type.Optional(Type.String()),
      error: Type.Optional(Type.String()),
      error_description: Type.Optional(Type.String()),
      state: Type.Optional(Type.String()),
    }),
  }

  // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
  fastify.get('/auth/kakao', { schema }, async (req, reply) => {
    const code = req.query.code
    const error = req.query.error
    const errorDescription = req.query.error_description

    if (!code) {
      const querystring = new URLSearchParams({
        error: error ?? 'error',
        error_description: errorDescription ?? 'error description',
      })
      return reply.redirect(`${FRONTEND_URL}/oauth?${querystring}`)
    }

    const kakaoUserToken = await fetchKakaoUserToken(code)
    if (kakaoUserToken.error) throw UnauthorizedError('유효하지 않은 접근입니다')

    const kakaoUser = await fetchKakaoUser(kakaoUserToken.access_token)
    if (!kakaoUser.id) throw ForbiddenError('권한이 없습니다')

    const { rowCount, rows } = await pool.query(getKakaoUser, [kakaoUser.id])
    const user = rows[0]

    // 소셜 로그인 정보가 없는 경우
    if (rowCount === 0) {
      unregisterKakaoUser(kakaoUser.id)
      return reply.redirect(`${FRONTEND_URL}/oauth?error=not-kakao-user`)
    }

    const querystring = new URLSearchParams({
      jwt: await reply.jwtSign({ id: user.id }),
    })

    return reply.redirect(`${FRONTEND_URL}/oauth?${querystring}`)
  })

  fastify.post('auth/kakao', { schema }, async (req, reply) => {
    const code = req.query.code
    const error = req.query.error
    const errorDescription = req.query.error_description

    if (!code) {
      const querystring = new URLSearchParams({
        error: error ?? 'error',
        error_description: errorDescription ?? 'error description',
      })
      return reply.redirect(`${FRONTEND_URL}/oauth?${querystring}`)
    }

    const kakaoUserToken = await fetchKakaoUserToken(code)
    if (kakaoUserToken.error) throw UnauthorizedError('유효하지 않은 접근입니다')

    const kakaoUser = await fetchKakaoUser(kakaoUserToken.access_token)
    if (!kakaoUser.id) throw ForbiddenError('권한이 없습니다')
  })
}

async function fetchKakaoUserToken(code: string) {
  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KAKAO_REST_API_KEY,
      code,
      client_secret: KAKAO_CLIENT_SECRET,
    }).toString(),
  })

  return response.json() as Promise<Record<string, any>>
}

async function fetchKakaoUser(accessToken: string) {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.json() as Promise<Record<string, any>>
}

export async function unregisterKakaoUser(kakaoUserId: string) {
  return fetch('https://kapi.kakao.com/v1/user/unlink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
    },
    body: new URLSearchParams({
      target_id_type: 'user_id',
      target_id: kakaoUserId,
    }).toString(),
  })
}
