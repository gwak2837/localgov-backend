/* @name getLocalExpenditures */
SELECT realm_code,
  sum(budget_crntam) AS budget_crntam_sum,
  sum(nxndr) AS nxndr_sum,
  sum(cty) AS cty_sum,
  sum(signgunon) AS signgunon_sum,
  sum(etc_crntam) AS etc_crntam_sum,
  sum(expndtram) AS expndtram_sum,
  sum(orgnztnam) AS orgnztnam_sum
FROM local_expenditure
WHERE excut_de BETWEEN $1 AND $2
  AND (
    $3::int IS NULL
    OR CASE
      WHEN $3 > 100 THEN sfrnd_code = $3
      ELSE sfrnd_code >= $3 * 100000
      AND sfrnd_code < ($3 + 1) * 100000
    END
  )
GROUP BY realm_code
ORDER BY budget_crntam_sum DESC;