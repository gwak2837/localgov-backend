/* @name getLofinBusiness */
SELECT sfrnd_code,
  detail_bsns_nm
FROM local_expenditure
WHERE id = $1;