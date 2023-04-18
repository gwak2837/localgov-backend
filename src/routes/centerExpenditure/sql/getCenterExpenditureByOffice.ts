/** Types generated for queries found in "src/routes/centerExpenditure/sql/getCenterExpenditureByOffice.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetCenterExpenditureByOffice' is invalid, so its result is assigned type 'never' */
export type IGetCenterExpenditureByOfficeResult = never;

/** Query 'GetCenterExpenditureByOffice' is invalid, so its parameters are assigned type 'never' */
export type IGetCenterExpenditureByOfficeParams = never;

const getCenterExpenditureByOfficeIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT SACTV_NM,\n  sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT_SUM\nFROM center_expenditure\nWHERE CASE\n    WHEN $2 IS NULL THEN FSCL_YY = $1\n    ELSE FSCL_YY >= $1\n    AND FSCL_YY <= $2\n  END\n  AND OFFC_NM = $3\nGROUP BY SACTV_NM\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT_SUM DESC\nLIMIT $4"};

/**
 * Query generated from SQL:
 * ```
 * SELECT SACTV_NM,
 *   sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT_SUM
 * FROM center_expenditure
 * WHERE CASE
 *     WHEN $2 IS NULL THEN FSCL_YY = $1
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


