/* @name getLofinBusiness */
SELECT sfrnd_code,
  detail_bsns_nm,
  excut_de,
  realm_code,
  sect_code
FROM local_expenditure
WHERE id = $1;