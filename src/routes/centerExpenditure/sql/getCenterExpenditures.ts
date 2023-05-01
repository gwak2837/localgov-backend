/** Types generated for queries found in "src/routes/centerExpenditure/sql/getCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCenterExpenditures' parameters type */
export type IGetCenterExpendituresParams = void;

/** 'GetCenterExpenditures' return type */
export interface IGetCenterExpendituresResult {
  offc_nm: string | null;
  y_prey_first_kcur_amt_sum: string | null;
  y_prey_fnl_frc_amt_sum: string | null;
  y_yy_dfn_medi_kcur_amt_sum: string | null;
  y_yy_medi_kcur_amt_sum: string | null;
}

/** 'GetCenterExpenditures' query type */
export interface IGetCenterExpendituresQuery {
  params: IGetCenterExpendituresParams;
  result: IGetCenterExpendituresResult;
}

const getCenterExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT OFFC_NM,\n  sum(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT_SUM,\n  sum(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT_SUM,\n  sum(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT_SUM,\n  sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT_SUM\nFROM center_expenditure\nWHERE CASE\n    WHEN $2::int IS NULL THEN FSCL_YY = $1\n    ELSE FSCL_YY >= $1\n    AND FSCL_YY <= $2\n  END\nGROUP BY OFFC_NM\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT_SUM DESC\nLIMIT $3"};

/**
 * Query generated from SQL:
 * ```
 * SELECT OFFC_NM,
 *   sum(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT_SUM,
 *   sum(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT_SUM,
 *   sum(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT_SUM,
 *   sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT_SUM
 * FROM center_expenditure
 * WHERE CASE
 *     WHEN $2::int IS NULL THEN FSCL_YY = $1
 *     ELSE FSCL_YY >= $1
 *     AND FSCL_YY <= $2
 *   END
 * GROUP BY OFFC_NM
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT_SUM DESC
 * LIMIT $3
 * ```
 */
export const getCenterExpenditures = new PreparedQuery<IGetCenterExpendituresParams,IGetCenterExpendituresResult>(getCenterExpendituresIR);


