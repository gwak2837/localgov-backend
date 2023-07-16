/** Types generated for queries found in "src/routes/analysis/sql/getCefinBusiness.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCefinBusiness' parameters type */
export type IGetCefinBusinessParams = void;

/** 'GetCefinBusiness' return type */
export interface IGetCefinBusinessResult {
  field: string;
  sector: string;
  title: string;
  when_year: number;
  who_name: string | null;
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

const getCefinBusinessIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT OFFC_NM AS who_name,\n  fscl_yy AS when_year,\n  fld_nm AS field,\n  sect_nm AS sector,\n  SACTV_NM AS title,\n  y_prey_first_kcur_amt,\n  y_prey_fnl_frc_amt,\n  y_yy_medi_kcur_amt,\n  y_yy_dfn_medi_kcur_amt\nFROM center_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT OFFC_NM AS who_name,
 *   fscl_yy AS when_year,
 *   fld_nm AS field,
 *   sect_nm AS sector,
 *   SACTV_NM AS title,
 *   y_prey_first_kcur_amt,
 *   y_prey_fnl_frc_amt,
 *   y_yy_medi_kcur_amt,
 *   y_yy_dfn_medi_kcur_amt
 * FROM center_expenditure
 * WHERE id = $1
 * ```
 */
export const getCefinBusiness = new PreparedQuery<IGetCefinBusinessParams,IGetCefinBusinessResult>(getCefinBusinessIR);


