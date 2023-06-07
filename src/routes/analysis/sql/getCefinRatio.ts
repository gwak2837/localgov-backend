/** Types generated for queries found in "src/routes/analysis/sql/getCefinRatio.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinRatio' parameters type */
export type IGetCefinRatioParams = void;

/** 'GetCefinRatio' return type */
export interface IGetCefinRatioResult {
  field_or_sector: string | null;
  y_yy_dfn_medi_kcur_amt: string | null;
}

/** 'GetCefinRatio' query type */
export interface IGetCefinRatioQuery {
  params: IGetCefinRatioParams;
  result: IGetCefinRatioResult;
}

const getCefinRatioIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT CASE\n    WHEN $3 THEN FLD_NM\n    ELSE SECT_NM\n  END AS field_or_sector,\n  -- SUM(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT,\n  -- SUM(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT,\n  -- SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,\n  SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT\nFROM center_expenditure\nWHERE FSCL_YY BETWEEN $1 AND $2\nGROUP BY field_or_sector"};

/**
 * Query generated from SQL:
 * ```
 * SELECT CASE
 *     WHEN $3 THEN FLD_NM
 *     ELSE SECT_NM
 *   END AS field_or_sector,
 *   -- SUM(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT,
 *   -- SUM(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT,
 *   -- SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,
 *   SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT
 * FROM center_expenditure
 * WHERE FSCL_YY BETWEEN $1 AND $2
 * GROUP BY field_or_sector
 * ```
 */
export const getCefinRatio = new PreparedQuery<IGetCefinRatioParams,IGetCefinRatioResult>(getCefinRatioIR);


