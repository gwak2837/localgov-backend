/* @name getPromptFromComm2 */
SELECT election.district AS who_code,
  election.category,
  primary_dept,
  finance.basis_date AS when_date,
  field_code,
  sector_code,
  commitment.title,
  content
FROM commitment
  JOIN election ON election.id = commitment.election_id
  AND commitment.id = $1
  LEFT JOIN finance ON finance.commitment_id = commitment.id
ORDER BY finance.basis_date DESC
LIMIT 1;

;