/* @name getLocalExpendituresByField */
SELECT id,
  sfrnd_code,
  excut_de,
  realm_code,
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
    $3::int [] IS NULL
    OR sfrnd_code = ANY($3)
  )
  AND realm_code = ANY($4)
GROUP BY id,
  sfrnd_code,
  excut_de,
  realm_code,
  detail_bsns_nm
ORDER BY budget_crntam DESC
LIMIT $5;