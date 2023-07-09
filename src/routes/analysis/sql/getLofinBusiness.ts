/** Types generated for queries found in "src/routes/analysis/sql/getLofinBusiness.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLofinBusiness' parameters type */
export type IGetLofinBusinessParams = void;

/** 'GetLofinBusiness' return type */
export interface IGetLofinBusinessResult {
  detail_bsns_nm: string;
  sfrnd_code: number;
}

/** 'GetLofinBusiness' query type */
export interface IGetLofinBusinessQuery {
  params: IGetLofinBusinessParams;
  result: IGetLofinBusinessResult;
}

const getLofinBusinessIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  detail_bsns_nm\nFROM local_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code,
 *   detail_bsns_nm
 * FROM local_expenditure
 * WHERE id = $1
 * ```
 */
export const getLofinBusiness = new PreparedQuery<IGetLofinBusinessParams,IGetLofinBusinessResult>(getLofinBusinessIR);


