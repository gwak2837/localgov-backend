/** Types generated for queries found in "src/routes/analysis/sql/getCefinBusiness.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinBusiness' parameters type */
export type IGetCefinBusinessParams = void;

/** 'GetCefinBusiness' return type */
export interface IGetCefinBusinessResult {
  actv_nm: string;
  bz_cls_nm: string;
  fld_nm: string;
  fscl_yy: number;
  id: string;
  offc_nm: string | null;
  pgm_nm: string;
  sactv_nm: string;
  sect_nm: string;
  y_prey_first_kcur_amt: string;
  y_prey_fnl_frc_amt: string;
  y_yy_dfn_medi_kcur_amt: string;
  y_yy_medi_kcur_amt: string;
}

/** 'GetCefinBusiness' query type */
export interface IGetCefinBusinessQuery {
  params: IGetCefinBusinessParams;
  result: IGetCefinBusinessResult;
}

const getCefinBusinessIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM center_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM center_expenditure
 * WHERE id = $1
 * ```
 */
export const getCefinBusiness = new PreparedQuery<IGetCefinBusinessParams,IGetCefinBusinessResult>(getCefinBusinessIR);


