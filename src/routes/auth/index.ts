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

  // fastify.get('/auth', { schema }, async (req, reply) => {
  //   const code = req.query.code

  //   const kakaoUserToken = await fetchKakaoUserToken(code)
  //   if (kakaoUserToken.error) throw UnauthorizedError('유효하지 않은 접근입니다')

  //   const kakaoUser = await fetchKakaoUser(kakaoUserToken.access_token)
  //   if (!kakaoUser.id) throw ForbiddenError('권한이 없습니다')

  //   const { rowCount, rows } = await pool.query<IGetKakaoUserResult>(getKakaoUser, [kakaoUser.id])
  //   const user = rows[0]

  //   const frontendURL = getFrontendURL(req.headers.referer)

  //   // 소셜 로그인 정보가 없는 경우
  //   if (rowCount === 0) {
  //     unregisterKakaoUser(kakaoUser.id)
  //     return res.redirect(`${frontendURL}/oauth?error=not-kakao-user`)
  //   }

  //   const querystring = new URLSearchParams({
  //     jwt: await res.jwtSign({ id: user.id }),
  //     ...(user.name && { username: user.name }),
  //   })

  //   return res.redirect(`${frontendURL}/oauth?${querystring}`)
  // })
}

// async function fetchKakaoUserToken(code: string) {
//   const response = await fetch('https://kauth.kakao.com/oauth/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       grant_type: 'authorization_code',
//       client_id: KAKAO_REST_API_KEY,
//       code,
//       client_secret: KAKAO_CLIENT_SECRET,
//     }).toString(),
//   })

//   return response.json() as Promise<Record<string, any>>
// }

// async function fetchKakaoUser(accessToken: string) {
//   const response = await fetch('https://kapi.kakao.com/v2/user/me', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })
//   return response.json() as Promise<Record<string, any>>
// }

// export async function unregisterKakaoUser(kakaoUserId: string) {
//   return fetch('https://kapi.kakao.com/v1/user/unlink', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
//     },
//     body: new URLSearchParams({
//       target_id_type: 'user_id',
//       target_id: kakaoUserId,
//     }).toString(),
//   })
// }
