/* @name getCompletionRatio */
SELECT commitment.id,
  finance.category,
  sum(gov) + sum(sido) + sum(sigungu) + sum(etc) AS total
FROM commitment
  JOIN election ON election.id = commitment.election_id
  AND election.category = $1
  AND (
    $2::int [] IS NULL
    OR election.district = ANY($2)
  )
  JOIN finance ON finance.commitment_id = commitment.id
  AND finance.basis_date = CASE
    WHEN $3::timestamptz IS NULL THEN (
      SELECT basis_date
      FROM finance
      ORDER BY basis_date DESC
      LIMIT 1
    )
    ELSE $3
  END
  AND (
    $4::int [] IS NULL
    OR finance.fiscal_year = ANY($4)
  )
GROUP BY commitment.id,
  finance.category
ORDER BY commitment.id;