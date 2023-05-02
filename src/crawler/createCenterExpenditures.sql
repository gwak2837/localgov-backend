/* @name createCenterExpenditures */
INSERT INTO center_expenditure (
    FSCL_YY,
    OFFC_NM,
    FLD_NM,
    SECT_NM,
    PGM_NM,
    ACTV_NM,
    SACTV_NM,
    BZ_CLS_NM,
    Y_PREY_FIRST_KCUR_AMT,
    Y_PREY_FNL_FRC_AMT,
    Y_YY_MEDI_KCUR_AMT,
    Y_YY_DFN_MEDI_KCUR_AMT
  )
SELECT *
FROM unnest(
    $1::int [],
    $2::text [],
    $3::text [],
    $4::text [],
    $5::text [],
    $6::text [],
    $7::text [],
    $8::text [],
    $9::bigint [],
    $10::bigint [],
    $11::bigint [],
    $12::bigint []
  );