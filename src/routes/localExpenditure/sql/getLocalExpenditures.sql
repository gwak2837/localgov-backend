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
WHERE sfrnd_code = $1
  AND excut_de BETWEEN $2 AND $3
GROUP BY realm_code
ORDER BY budget_crntam_sum DESC;