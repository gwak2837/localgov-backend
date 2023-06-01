/* @name getCommitments */
SELECT commitment.id,
  prmsRealmName,
  prmsTitle,
  prmmCont,
  candidate_id,
  candidate.id AS candidate__id,
  sgId AS candidate__sgId,
  sgTypecode AS candidate__sgTypecode,
  sggName AS candidate__sggName,
  sidoName AS candidate__sidoName,
  wiwName AS candidate__wiwName,
  partyName AS candidate__partyName,
  krName AS candidate__krName
FROM commitment
  JOIN candidate ON candidate.id = commitment.candidate_id
  AND candidate.id = ANY ($1)
WHERE commitment.id < $2
ORDER BY commitment.id DESC
LIMIT $3;