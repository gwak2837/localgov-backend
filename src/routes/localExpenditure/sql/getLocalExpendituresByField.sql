/* @name getLocalExpendituresByField */
SELECT id,
  detail_bsns_nm,
  sum(budget_crntam) AS budget_crntam,
  sum(nxndr) AS nxndr,
  sum(cty) AS cty,
  sum(signgunon) AS signgunon,
  sum(etc_crntam) AS etc_crntam,
  sum(expndtram) AS expndtram,
  sum(orgnztnam) AS orgnztnam
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
  AND realm_code = $4
GROUP BY id,
  detail_bsns_nm
ORDER BY budget_crntam DESC
LIMIT $5;