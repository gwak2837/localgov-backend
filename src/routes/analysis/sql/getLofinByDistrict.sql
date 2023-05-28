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
WHERE CASE
    WHEN $1 THEN realm_code = $2
    ELSE sect_code = $2
  END
GROUP BY sfrnd_code
ORDER BY budget_crntam DESC;