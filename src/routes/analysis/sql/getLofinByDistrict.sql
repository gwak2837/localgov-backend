/* @name getLofinByDistrict */
SELECT sfrnd_code,
  sum(budget_crntam) AS budget_crntam,
  sum(nxndr) AS nxndr,
  sum(cty) AS cty,
  sum(signgunon) AS signgunon,
  sum(etc_crntam) AS etc_crntam,
  sum(expndtram) AS expndtram,
  sum(orgnztnam) AS orgnztnam
FROM local_expenditure
WHERE sfrnd_code = $1
  AND CASE
    WHEN $2 THEN realm_code = $3
    ELSE sect_code = $3
  END
  AND excut_de BETWEEN $4 AND $5
ORDER BY budget_crntam DESC;