/* @name updateCandidate */
UPDATE candidate
SET sgId = $2,
  sgTypecode = $3,
  sggName = $4,
  sidoName = $5,
  wiwName = $6,
  partyName = $7,
  krName = $8
WHERE id = $1;