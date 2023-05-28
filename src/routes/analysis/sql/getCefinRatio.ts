/** Types generated for queries found in "src/routes/analysis/sql/getCefinRatio.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinRatio' parameters type */
export type IGetCefinRatioParams = void;

/** 'GetCefinRatio' return type */
export interface IGetCefinRatioResult {
  sect_nm: string | null;
  y_prey_first_kcur_amt: string | null;
  y_prey_fnl_frc_amt: string | null;
  y_yy_dfn_medi_kcur_amt: string | null;
  y_yy_medi_kcur_amt: string | null;
}

/** 'GetCefinRatio' query type */
export interface IGetCefinRatioQuery {
  params: IGetCefinRatioParams;
  result: IGetCefinRatioResult;
}

const getCefinRatioIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT CASE\n    WHEN $2 THEN FLD_NM\n    ELSE SECT_NM\n  END,\n  SUM(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT,\n  SUM(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT,\n  SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,\n  SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT\nFROM center_expenditure\nWHERE FSCL_YY = $1\nGROUP BY CASE\n    WHEN $2 THEN FLD_NM\n    ELSE SECT_NM\n  END\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT CASE
 *     WHEN $2 THEN FLD_NM
 *     ELSE SECT_NM
 *   END,
 *   SUM(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT,
 *   SUM(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT,
 *   SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,
 *   SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT
 * FROM center_expenditure
 * WHERE FSCL_YY = $1
 * GROUP BY CASE
 *     WHEN $2 THEN FLD_NM
 *     ELSE SECT_NM
 *   END
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC
 * ```
 */
export const getCefinRatio = new PreparedQuery<IGetCefinRatioParams,IGetCefinRatioResult>(getCefinRatioIR);


