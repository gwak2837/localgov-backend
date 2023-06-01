/* @name getCandidates */
SELECT id,
  sgId,
  sgTypecode,
  sggName,
  sidoName,
  wiwName,
  partyName,
  krName
FROM candidate
ORDER BY id DESC;