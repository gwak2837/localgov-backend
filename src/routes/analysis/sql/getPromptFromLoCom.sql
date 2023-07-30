/* @name getPromptFromLoCom */
SELECT election.district AS who_code,
  primary_dept,
  finance.basis_date AS when_,
  field_code,
  sector_code,
  commitment.title,
  content
FROM commitment
  JOIN election ON election.id = commitment.election_id
  JOIN finance ON finance.commitment_id = commitment.id
  AND commitment.id = $1;