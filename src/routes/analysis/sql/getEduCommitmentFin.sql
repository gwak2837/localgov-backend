/* @name getEduCommitmentFin */
SELECT id,
  title,
  basis_date,
  category,
  fiscal_year,
  itself,
  gov,
  sido,
  etc
FROM edu_finance
WHERE commitment_id = $1;