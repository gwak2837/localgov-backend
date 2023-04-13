/** Types generated for queries found in "src/routes/centerExpenditure/sql/getCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetCenterExpenditures' is invalid, so its result is assigned type 'never' */
export type IGetCenterExpendituresResult = never;

/** Query 'GetCenterExpenditures' is invalid, so its parameters are assigned type 'never' */
export type IGetCenterExpendituresParams = never;

const getCenterExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  OFFC_NM,\n  FLD_NM,\n  SECT_NM,\n  PGM_NM,\n  ACTV_NM,\n  SACTV_NM,\n  BZ_CLS_NM,\n  Y_YY_DFN_MEDI_KCUR_AMT\nFROM center_expenditure\nWHERE FSCL_YY = $1\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC\nLIMIT $2"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   OFFC_NM,
 *   FLD_NM,
 *   SECT_NM,
 *   PGM_NM,
 *   ACTV_NM,
 *   SACTV_NM,
 *   BZ_CLS_NM,
 *   Y_YY_DFN_MEDI_KCUR_AMT
 * FROM center_expenditure
 * WHERE FSCL_YY = $1
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC
 * LIMIT $2
 * ```
 */
export const getCenterExpenditures = new PreparedQuery<IGetCenterExpendituresParams,IGetCenterExpendituresResult>(getCenterExpendituresIR);


