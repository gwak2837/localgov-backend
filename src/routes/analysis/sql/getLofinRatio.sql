/* @name getLofinRatio */
SELECT CASE
    WHEN $4 THEN realm_code
    ELSE sect_code
  END,
  SUM(budget_crntam) AS budget_crntam,
  SUM(nxndr) AS nxndr,
  SUM(cty) AS cty,
  SUM(signgunon) AS signgunon,
  SUM(etc_crntam) AS etc_crntam,
  SUM(expndtram) AS expndtram,
  SUM(orgnztnam) AS orgnztnam
FROM local_expenditure
WHERE sfrnd_code = $1
  AND excut_de BETWEEN $2 AND $3
GROUP BY CASE
    WHEN $4 THEN realm_code
    ELSE sect_code
  END
ORDER BY budget_crntam;