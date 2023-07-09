/* @name getCefinBusiness */
SELECT OFFC_NM,
  SACTV_NM
FROM center_expenditure
WHERE id = $1;