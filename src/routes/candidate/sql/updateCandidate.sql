/* @name updateCandidate */
UPDATE candidate
SET sgId = $2,
  sgName = $3,
  sgTypecode = $4,
  sggName = $5,
  sidoName = $6,
  wiwName = $7,
  partyName = $8,
  krName = $9
WHERE id = $1;