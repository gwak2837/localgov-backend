/* @name getLofinBusiness */
SELECT sfrnd_code,
  detail_bsns_nm,
  excut_de,
  -- budget_crntam,
  -- nxndr,
  -- cty,
  -- signgunon,
  -- etc_crntam,
  -- expndtram,
  -- orgnztnam,
  realm_code,
  sect_code
FROM local_expenditure
WHERE id = $1;