/* @name getRelatedCommitments */
SELECT *
FROM (
    SELECT commitment.id,
      title,
      content,
      field_code,
      election.category,
      election.election_date::text,
      election.district
    FROM commitment
      JOIN election ON election.id = commitment.election_id
    WHERE field_code = $1
      AND commitment.id != $2
    ORDER BY category DESC
  ) AS temp
UNION ALL
SELECT commitment.id,
  title,
  content,
  field_code,
  election.category,
  election.election_date::text,
  election.district
FROM commitment
  JOIN election ON election.id = commitment.election_id
WHERE field_code != $1
LIMIT 20;