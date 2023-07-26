/* @name getPromptFromLoCom */
SELECT sfrnd_code AS who_code,
  finance.basis_date AS when_,
  field_code,
  sector_code,
  commitment.title
FROM commitment
  JOIN finance ON finance.commitment_id = commitment.id
  AND commitment.id = $1;