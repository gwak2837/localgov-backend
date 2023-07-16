/* @name getCefinBusiness */
SELECT OFFC_NM AS who_name,
  fscl_yy AS when_year,
  fld_nm AS field,
  sect_nm AS sector,
  SACTV_NM AS title,
  y_prey_first_kcur_amt,
  y_prey_fnl_frc_amt,
  y_yy_medi_kcur_amt,
  y_yy_dfn_medi_kcur_amt
FROM center_expenditure
WHERE id = $1;