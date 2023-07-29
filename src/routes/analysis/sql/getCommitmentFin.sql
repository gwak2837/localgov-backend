/* @name getCommitmentFin */
SELECT id,
  basis_date,
  category,
  fiscal_year,
  gov,
  sido,
  sigungu,
  etc
FROM finance
WHERE commitment_id = $1;