/* @name getCompletionRatio */
SELECT commitment.id,
  finance.category,
  sum(gov_expenditure) + sum(sido_expenditure) + sum(sigungu_expenditure) + sum(etc_expenditure) AS total
FROM commitment
  JOIN finance ON finance.commitment_id = commitment.id
  AND finance.basis_date = CASE
    WHEN $1::timestamptz IS NULL THEN (
      SELECT basis_date
      FROM finance
      ORDER BY basis_date DESC
      LIMIT 1
    )
    ELSE $1
  END
  AND (
    $2::int [] IS NULL
    OR finance.fiscal_year = ANY($2)
  )
  AND (
    $3::int [] IS NULL
    OR commitment.sfrnd_code = ANY($3)
  )
GROUP BY commitment.id,
  finance.category
ORDER BY commitment.id;