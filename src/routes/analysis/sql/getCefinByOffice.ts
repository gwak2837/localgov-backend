/** Types generated for queries found in "src/routes/analysis/sql/getCefinByOffice.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinByOffice' parameters type */
export type IGetCefinByOfficeParams = void;

/** 'GetCefinByOffice' return type */
export interface IGetCefinByOfficeResult {
  offc_nm: string | null;
  y_prey_first_kcur_amt: string | null;
  y_prey_fnl_frc_amt: string | null;
  y_yy_dfn_medi_kcur_amt: string | null;
  y_yy_medi_kcur_amt: string | null;
}

/** 'GetCefinByOffice' query type */
export interface IGetCefinByOfficeQuery {
  params: IGetCefinByOfficeParams;
  result: IGetCefinByOfficeResult;
}

const getCefinByOfficeIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT OFFC_NM,\n  SUM(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT,\n  SUM(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT,\n  SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,\n  SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT\nFROM center_expenditure\nWHERE CASE\n    WHEN $1 THEN FLD_NM = ANY ($2)\n    ELSE SECT_NM = ANY ($2)\n  END\nGROUP BY OFFC_NM\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT OFFC_NM,
 *   SUM(Y_PREY_FIRST_KCUR_AMT) AS Y_PREY_FIRST_KCUR_AMT,
 *   SUM(Y_PREY_FNL_FRC_AMT) AS Y_PREY_FNL_FRC_AMT,
 *   SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,
 *   SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT
 * FROM center_expenditure
 * WHERE CASE
 *     WHEN $1 THEN FLD_NM = ANY ($2)
 *     ELSE SECT_NM = ANY ($2)
 *   END
 * GROUP BY OFFC_NM
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC
 * ```
 */
export const getCefinByOffice = new PreparedQuery<IGetCefinByOfficeParams,IGetCefinByOfficeResult>(getCefinByOfficeIR);


