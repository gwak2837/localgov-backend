/* @name getCommitments */
SELECT commitment.id,
  prmsRealmName,
  prmsTitle,
  prmmCont,
  candidate_id,
  candidate.id AS candidate__id,
  sgId AS candidate__sgId,
  sgName AS candidate__sgName,
  sgTypecode AS candidate__sgTypecode,
  sggName AS candidate__sggName,
  sidoName AS candidate__sidoName,
  wiwName AS candidate__wiwName,
  partyName AS candidate__partyName,
  krName AS candidate__krName
FROM commitment
  JOIN candidate ON candidate.id = commitment.candidate_id
WHERE commitment.id < $1
  AND (
    $2::int IS NULL
    OR sgId BETWEEN $2 AND $3
  )
  AND (
    $4::text IS NULL
    OR sidoName = $4
  )
  AND (
    $5::text IS NULL
    OR sggName = $5
  )
  AND (
    $6::int IS NULL
    OR sgTypecode = $6
  )
  AND (
    $7::text IS NULL
    OR krName = $7
  )
ORDER BY commitment.id DESC
LIMIT $8;