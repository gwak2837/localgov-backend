/** Types generated for queries found in "src/routes/centerExpenditure/sql/getCenterExpenditureByOffice.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCenterExpenditureByOffice' parameters type */
export type IGetCenterExpenditureByOfficeParams = void;

/** 'GetCenterExpenditureByOffice' return type */
export interface IGetCenterExpenditureByOfficeResult {
  sactv_nm: string;
  y_prey_first_kcur_amt_sum: string | null;
  y_prey_fnl_frc_amt_sum: string | null;
  y_yy_dfn_medi_kcur_amt_sum: string | null;
  y_yy_medi_kcur_amt_sum: string | null;
}

/** 'GetCenterExpenditureByOffice' query type */
export interface IGetCenterExpenditureByOfficeQuery {
  params: IGetCenterExpenditureByOfficeParams;
  result: IGetCenterExpenditureByOfficeResult;
}

const getCenterExpenditureByOfficeIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SACTV_NM,\n  sum(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT_SUM,\n  sum(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT_SUM,\n  sum(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT_SUM,\n  sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT_SUM\nFROM center_expenditure\nWHERE CASE\n    WHEN $2::int IS NULL THEN FSCL_YY = $1\n    ELSE FSCL_YY >= $1\n    AND FSCL_YY <= $2\n  END\n  AND OFFC_NM = $3\nGROUP BY SACTV_NM\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT_SUM DESC\nLIMIT $4"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SACTV_NM,
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
 *   AND OFFC_NM = $3
 * GROUP BY SACTV_NM
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT_SUM DESC
 * LIMIT $4
 * ```
 */
export const getCenterExpenditureByOffice = new PreparedQuery<IGetCenterExpenditureByOfficeParams,IGetCenterExpenditureByOfficeResult>(getCenterExpenditureByOfficeIR);


