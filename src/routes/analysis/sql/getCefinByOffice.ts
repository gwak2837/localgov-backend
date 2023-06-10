/** Types generated for queries found in "src/routes/analysis/sql/getCefinByOffice.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinByOffice' parameters type */
export type IGetCefinByOfficeParams = void;

/** 'GetCefinByOffice' return type */
export interface IGetCefinByOfficeResult {
  offc_nm: string | null;
  y_yy_dfn_medi_kcur_amt: string | null;
  y_yy_medi_kcur_amt: string | null;
}

/** 'GetCefinByOffice' query type */
export interface IGetCefinByOfficeQuery {
  params: IGetCefinByOfficeParams;
  result: IGetCefinByOfficeResult;
}

const getCefinByOfficeIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT OFFC_NM,\n  SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,\n  SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT\nFROM center_expenditure\nWHERE FSCL_YY BETWEEN $1 AND $2\n  AND CASE\n    WHEN $3 THEN FLD_NM = ANY ($4)\n    ELSE SECT_NM = ANY ($4)\n  END\nGROUP BY OFFC_NM\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT OFFC_NM,
 *   SUM(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,
 *   SUM(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT
 * FROM center_expenditure
 * WHERE FSCL_YY BETWEEN $1 AND $2
 *   AND CASE
 *     WHEN $3 THEN FLD_NM = ANY ($4)
 *     ELSE SECT_NM = ANY ($4)
 *   END
 * GROUP BY OFFC_NM
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC
 * ```
 */
export const getCefinByOffice = new PreparedQuery<IGetCefinByOfficeParams,IGetCefinByOfficeResult>(getCefinByOfficeIR);


