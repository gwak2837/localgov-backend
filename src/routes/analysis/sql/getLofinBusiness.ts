/** Types generated for queries found in "src/routes/analysis/sql/getLofinBusiness.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLofinBusiness' parameters type */
export type IGetLofinBusinessParams = void;

/** 'GetLofinBusiness' return type */
export interface IGetLofinBusinessResult {
  budget_crntam: string;
  cty: string;
  detail_bsns_nm: string;
  etc_crntam: string;
  excut_de: Date | null;
  expndtram: string;
  nxndr: string;
  orgnztnam: string;
  realm_code: number;
  sect_code: number;
  sfrnd_code: number;
  signgunon: string;
}

/** 'GetLofinBusiness' query type */
export interface IGetLofinBusinessQuery {
  params: IGetLofinBusinessParams;
  result: IGetLofinBusinessResult;
}

const getLofinBusinessIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  detail_bsns_nm,\n  excut_de,\n  budget_crntam,\n  nxndr,\n  cty,\n  signgunon,\n  etc_crntam,\n  expndtram,\n  orgnztnam,\n  realm_code,\n  sect_code\nFROM local_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code,
 *   detail_bsns_nm,
 *   excut_de,
 *   budget_crntam,
 *   nxndr,
 *   cty,
 *   signgunon,
 *   etc_crntam,
 *   expndtram,
 *   orgnztnam,
 *   realm_code,
 *   sect_code
 * FROM local_expenditure
 * WHERE id = $1
 * ```
 */
export const getLofinBusiness = new PreparedQuery<IGetLofinBusinessParams,IGetLofinBusinessResult>(getLofinBusinessIR);


