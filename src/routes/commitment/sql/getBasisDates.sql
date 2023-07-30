/* @name getBasisDate */
SELECT DISTINCT finance.basis_date::text
FROM finance
  JOIN commitment ON commitment.id = finance.commitment_id
  JOIN election ON election.id = commitment.election_id
  AND election.category = $1
ORDER BY basis_date DESC;