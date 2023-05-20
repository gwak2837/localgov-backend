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
WHERE sgId BETWEEN $1 AND $2
  AND commitment.id < $3
ORDER BY commitment.id DESC
LIMIT $4;