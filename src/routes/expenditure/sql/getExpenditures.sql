/* @name getExpenditures */
SELECT id,
  accnut_year,
  wdr_sfrnd_code,
  wdr_sfrnd_code_nm,
  sfrnd_code,
  sfrnd_nm_korean,
  accnut_se_code,
  accnut_se_nm,
  dept_code,
  detail_bsns_code,
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
  realm_nm,
  sect_code,
  sect_nm,
  administ_sfrnd_code
FROM expenditure
WHERE wdr_sfrnd_code = $1
  AND excut_de = $2
  AND realm_code = ANY ($3)
ORDER BY budget_crntam DESC
LIMIT $4;