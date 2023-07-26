/* @name getLocalCommitment */
SELECT election.district AS who_code,
  finance.basis_date AS when_date,
  field_code AS field_code,
  sector_code AS sector_code,
  commitment.title,
  content
FROM commitment
  JOIN election ON election.id = commitment.election_id
  JOIN finance ON finance.commitment_id = commitment.id
  AND commitment.id = $1
ORDER BY finance.basis_date DESC
LIMIT 1;