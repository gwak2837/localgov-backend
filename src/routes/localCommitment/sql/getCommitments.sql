/* @name getCommitments */
SELECT id,
  title,
  priority,
  field_code,
  sector_code,
  basis_date,
  category,
  total,
  CASE
    WHEN total > 0 THEN round(100 * gov_expenditure / total, 1)
    ELSE NULL
  END AS gov_ratio
FROM (
    SELECT commitment.id,
      commitment.title,
      priority,
      field_code,
      sector_code,
      finance.basis_date,
      finance.category,
      sum(gov_expenditure) AS gov_expenditure,
      sum(gov_expenditure) + sum(sido_expenditure) + sum(sigungu_expenditure) + sum(etc_expenditure) AS total
    FROM commitment
      LEFT JOIN finance ON finance.commitment_id = commitment.id
      AND (
        CASE
          WHEN $1::timestamptz IS NULL THEN finance.basis_date = ANY(
            SELECT DISTINCT basis_date
            FROM finance
            ORDER BY basis_date DESC
            LIMIT 2
          )
          ELSE finance.basis_date = ANY(
            ARRAY [$1, (select distinct basis_date from finance where basis_date < $1 order by basis_date desc limit 1)]
          )
        END
      )
      AND (
        $2::int [] IS NULL
        OR commitment.sfrnd_code = ANY($2)
      )
    GROUP BY commitment.id,
      finance.basis_date,
      finance.category
    ORDER BY commitment.id
  ) AS temp;