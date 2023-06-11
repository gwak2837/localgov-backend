/** Types generated for queries found in "src/routes/centerExpenditure/sql/getCefin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefin' parameters type */
export type IGetCefinParams = void;

/** 'GetCefin' return type */
export interface IGetCefinResult {
  offc_nm: string | null;
  y_yy_dfn_medi_kcur_amt: string | null;
  y_yy_medi_kcur_amt: string | null;
}

/** 'GetCefin' query type */
export interface IGetCefinQuery {
  params: IGetCefinParams;
  result: IGetCefinResult;
}

const getCefinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT OFFC_NM,\n  sum(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,\n  sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT\nFROM center_expenditure\nWHERE FSCL_YY BETWEEN $1 AND $2\n  AND (\n    $3::boolean IS NULL\n    OR CASE\n      WHEN $3 THEN FLD_NM = ANY($4)\n      ELSE SECT_NM = ANY($4)\n    END\n  )\nGROUP BY OFFC_NM\nORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC\nLIMIT $5"};

/**
 * Query generated from SQL:
 * ```
 * SELECT OFFC_NM,
 *   sum(Y_YY_MEDI_KCUR_AMT) AS Y_YY_MEDI_KCUR_AMT,
 *   sum(Y_YY_DFN_MEDI_KCUR_AMT) AS Y_YY_DFN_MEDI_KCUR_AMT
 * FROM center_expenditure
 * WHERE FSCL_YY BETWEEN $1 AND $2
 *   AND (
 *     $3::boolean IS NULL
 *     OR CASE
 *       WHEN $3 THEN FLD_NM = ANY($4)
 *       ELSE SECT_NM = ANY($4)
 *     END
 *   )
 * GROUP BY OFFC_NM
 * ORDER BY Y_YY_DFN_MEDI_KCUR_AMT DESC
 * LIMIT $5
 * ```
 */
export const getCefin = new PreparedQuery<IGetCefinParams,IGetCefinResult>(getCefinIR);


