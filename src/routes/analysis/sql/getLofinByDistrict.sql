/* @name getLofinByDistrict */
SELECT sfrnd_code,
  SUM(budget_crntam) AS budget_crntam -- sum(nxndr) AS nxndr,
  -- sum(cty) AS cty,
  -- sum(signgunon) AS signgunon,
  -- sum(etc_crntam) AS etc_crntam,
  -- sum(expndtram) AS expndtram,
  -- sum(orgnztnam) AS orgnztnam
FROM local_expenditure
WHERE excut_de BETWEEN $1 AND $2
  AND CASE
    WHEN $3 THEN realm_code = ANY ($4)
    ELSE sect_code = ANY ($4)
  END
GROUP BY sfrnd_code
ORDER BY sfrnd_code;