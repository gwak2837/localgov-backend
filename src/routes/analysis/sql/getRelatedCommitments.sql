/* @name getRelatedCommitments */
SELECT commitment.id,
  title,
  content,
  field_code,
  election.category,
  election.election_date,
  election.district
FROM commitment
  JOIN election ON election.id = commitment.election_id
WHERE field_code = $1
UNION ALL
SELECT commitment.id,
  title,
  content,
  field_code,
  election.category,
  election.election_date,
  election.district
FROM commitment
  JOIN election ON election.id = commitment.election_id
WHERE field_code != $1
LIMIT 20;