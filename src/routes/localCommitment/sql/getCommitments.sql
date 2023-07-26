/* @name getCommitments */
SELECT commitment.id,
  commitment.title,
  commitment.priority,
  commitment.field_code,
  commitment.sector_code,
  election.category AS election__category,
  election.district,
  finance.basis_date,
  finance.category AS finance__category,
  sum(gov) AS gov,
  sum(gov) + sum(sido) + sum(sigungu) + sum(etc) AS total
FROM commitment
  JOIN election ON election.id = commitment.election_id
  AND election.category = $1
  AND (
    $2::int [] IS NULL
    OR election.district = ANY($2)
  )
  JOIN finance ON finance.commitment_id = commitment.id
  AND (
    CASE
      WHEN $3::timestamptz IS NULL THEN finance.basis_date = ANY(
        SELECT DISTINCT finance.basis_date
        FROM commitment
          JOIN election ON election.id = commitment.election_id
          AND election.district = ANY($2)
          JOIN finance ON finance.commitment_id = commitment.id
        ORDER BY finance.basis_date DESC
        LIMIT 2
      )
      ELSE finance.basis_date = ANY(
        ARRAY [$3, (
              SELECT DISTINCT basis_date 
              FROM commitment
                JOIN election ON election.id = commitment.election_id
                AND election.district = ANY($2)
                JOIN finance ON finance.commitment_id = commitment.id
              WHERE basis_date < $3 
              order by basis_date desc 
              limit 1
            )]
      )
    END
  )
GROUP BY commitment.id,
  election.id,
  finance.basis_date,
  finance.category
ORDER BY commitment.id;