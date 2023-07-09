/* @name getPromptFromCefin */
SELECT sfrnd_code AS who_code,
  DATE_PART('year', excut_de) AS when_year,
  realm_code AS field_code,
  sect_code AS sector_code,
  detail_bsns_nm AS title
FROM local_expenditure
WHERE id = $1;