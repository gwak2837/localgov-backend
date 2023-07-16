/* @name getLofinBusiness */
SELECT sfrnd_code AS who_code,
  DATE_PART('year', excut_de) AS when_year,
  realm_code AS field_code,
  sect_code AS sector_code,
  detail_bsns_nm AS title,
  nxndr AS gov,
  cty AS sido,
  signgunon AS sigungu,
  etc_crntam AS etc,
  expndtram,
  orgnztnam
FROM local_expenditure
WHERE id = $1;