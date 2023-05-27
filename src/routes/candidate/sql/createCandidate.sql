/* @name createCandidate */
INSERT INTO candidate(
    sgId,
    sgName,
    sgTypecode,
    sggName,
    sidoName,
    wiwName,
    partyName,
    krName
  )
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id;