/* @name getLocalCommitmentFin */
SELECT id,
  category,
  basis_date,
  fiscal_year,
  gov,
  sido,
  sigungu,
  etc
FROM finance
WHERE commitment_id = $1;