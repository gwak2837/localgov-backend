/** Types generated for queries found in "src/routes/analysis/sql/getCefinBusiness.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinBusiness' parameters type */
export type IGetCefinBusinessParams = void;

/** 'GetCefinBusiness' return type */
export interface IGetCefinBusinessResult {
  fld_nm: string;
  offc_nm: string | null;
  sactv_nm: string;
  sect_nm: string;
}

/** 'GetCefinBusiness' query type */
export interface IGetCefinBusinessQuery {
  params: IGetCefinBusinessParams;
  result: IGetCefinBusinessResult;
}

const getCefinBusinessIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT OFFC_NM,\n  FLD_NM,\n  SECT_NM,\n  SACTV_NM\nFROM center_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT OFFC_NM,
 *   FLD_NM,
 *   SECT_NM,
 *   SACTV_NM
 * FROM center_expenditure
 * WHERE id = $1
 * ```
 */
export const getCefinBusiness = new PreparedQuery<IGetCefinBusinessParams,IGetCefinBusinessResult>(getCefinBusinessIR);


