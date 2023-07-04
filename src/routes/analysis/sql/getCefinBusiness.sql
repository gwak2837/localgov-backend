/* @name getCefinBusiness */
SELECT OFFC_NM,
  FLD_NM,
  SECT_NM,
  SACTV_NM
FROM center_expenditure
WHERE id = $1;