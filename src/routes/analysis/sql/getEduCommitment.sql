/* @name getEduCommitment */
SELECT sfrnd_code AS who_code,
  edu_finance.basis_date AS when_date,
  field_code AS field_code,
  sector_code AS sector_code,
  edu_commitment.title,
  content
FROM edu_commitment
  JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
  AND edu_commitment.id = $1
ORDER BY edu_finance.basis_date DESC
LIMIT 1;