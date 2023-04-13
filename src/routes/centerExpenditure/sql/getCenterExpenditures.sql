/* @name getCenterExpenditures */
SELECT id,
  OFFC_NM,
  FLD_NM,
  SECT_NM,
  PGM_NM,
  ACTV_NM,
  SACTV_NM,
  BZ_CLS_NM,
  Y_YY_DFN_MEDI_KCUR_AMT
FROM center_expenditure
WHERE FSCL_YY = $1
ORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC
LIMIT $2;