/* @name getPromptFromLoEdu */
SELECT sfrnd_code AS who_code,
  edu_finance.basis_date AS when_,
  field_code,
  sector_code,
  edu_commitment.title
FROM edu_commitment
  JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
  AND edu_commitment.id = $1;