/* @name getLofinRatio */
SELECT CASE
    WHEN $3::int IS NULL
    OR $3 < 100 THEN sfrnd_code
  END,
  CASE
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
WHERE excut_de BETWEEN $1 AND $2
  AND (
    $3::int IS NULL
    OR CASE
      WHEN $3 > 100 THEN sfrnd_code = $3
      ELSE sfrnd_code >= $3 * 100000
      AND sfrnd_code < ($3 + 1) * 100000
    END
  )
GROUP BY sfrnd_code,
  CASE
    WHEN $4 THEN realm_code
    ELSE sect_code
  END
ORDER BY sfrnd_code,
  budget_crntam DESC;