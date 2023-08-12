/* @name getKakaoUser */
SELECT id
FROM "user"
WHERE oauth_kakao = $1;