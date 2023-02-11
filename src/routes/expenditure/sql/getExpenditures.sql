/* @name getExpenditures */
SELECT id,
  sfrnd_code,
  accnut_se_nm,
  dept_code,
  detail_bsns_nm,
  excut_de,
  budget_crntam,
  nxndr,
  cty,
  signgunon,
  etc_crntam,
  expndtram,
  orgnztnam,
  realm_code,
  sect_code
FROM expenditure
WHERE excut_de = $1
  AND (
    $2::int IS NULL
    OR CASE
      WHEN $3 THEN sfrnd_code >= $2
      AND sfrnd_code < $2 + 100000
      ELSE sfrnd_code = $2
    END
  )
  AND (
    $4::int [] IS NULL
    OR realm_code = ANY ($4)
  )
ORDER BY budget_crntam DESC
LIMIT $5;