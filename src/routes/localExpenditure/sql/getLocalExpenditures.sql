/* @name getLocalExpenditures */
SELECT realm_code,
  sum(budget_crntam) AS budget_crntam_sum
FROM expenditure
WHERE excut_de >= $1
  AND excut_de < $2
  AND (
    $3::int IS NULL
    OR CASE
      WHEN $4 THEN sfrnd_code >= $3
      AND sfrnd_code < $3 + 100000
      ELSE sfrnd_code = $3
    END
  )
GROUP BY realm_code
ORDER BY budget_crntam_sum DESC;