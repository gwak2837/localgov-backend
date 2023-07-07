/* @name getCompletionRatio */
SELECT edu_commitment.id,
  edu_finance.category,
  sum(itself) + sum(gov) + sum(sido) + sum(etc) AS total
FROM edu_commitment
  JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
  AND (
    $1::int [] IS NULL
    OR edu_commitment.sfrnd_code = ANY($1)
  )
  AND edu_finance.basis_date = CASE
    WHEN $2::timestamptz IS NULL THEN (
      SELECT basis_date
      FROM edu_finance
      ORDER BY basis_date DESC
      LIMIT 1
    )
    ELSE $2
  END
  AND (
    $3::int [] IS NULL
    OR edu_finance.fiscal_year = ANY($3)
  )
GROUP BY edu_commitment.id,
  edu_finance.category
ORDER BY edu_commitment.id;