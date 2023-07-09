/* @name getPromptFromCefin */
SELECT offc_nm AS who_name,
  fscl_yy AS when_year,
  fld_nm AS field,
  sect_nm AS sector,
  sactv_nm AS title
FROM center_expenditure
WHERE id = $1;