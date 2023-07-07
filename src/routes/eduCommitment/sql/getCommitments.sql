/* @name getCommitments */
SELECT id,
  title,
  sfrnd_code,
  field_code,
  sector_code,
  priority,
  basis_date,
  category,
  total,
  CASE
    WHEN total > 0 THEN round(100 * gov / total, 1)
    ELSE NULL
  END AS gov_ratio
FROM (
    SELECT edu_commitment.id,
      edu_commitment.title,
      sfrnd_code,
      field_code,
      sector_code,
      priority,
      edu_finance.basis_date,
      edu_finance.category,
      sum(gov) AS gov,
      sum(itself) + sum(gov) + sum(sido) + sum(etc) AS total
    FROM edu_commitment
      LEFT JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
      AND (
        $1::int [] IS NULL
        OR edu_commitment.sfrnd_code = ANY($1)
      )
      AND (
        CASE
          WHEN $2::timestamptz IS NULL THEN edu_finance.basis_date = ANY(
            SELECT DISTINCT basis_date
            FROM edu_finance
            ORDER BY basis_date DESC
            LIMIT 2
          )
          ELSE edu_finance.basis_date = ANY(
            ARRAY [$2, (SELECT DISTINCT basis_date FROM edu_finance WHERE basis_date < $2 ORDER BY basis_date DESC LIMIT 1)]
          )
        END
      )
    GROUP BY edu_commitment.id,
      edu_finance.basis_date,
      edu_finance.category
    ORDER BY edu_commitment.id
  ) AS temp;