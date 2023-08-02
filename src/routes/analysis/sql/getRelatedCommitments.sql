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
      AND field_code = $1
      AND commitment.id != $2
      AND (
        $3::int IS NULL
        OR election.district != $3
      )
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
  AND field_code != $1
  AND (
    $3::int IS NULL
    OR election.district != $3
  )
LIMIT 20;