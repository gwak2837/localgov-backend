/** Types generated for queries found in "src/routes/expenditure/sql/getExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetExpenditures' parameters type */
export type IGetExpendituresParams = void;

/** 'GetExpenditures' return type */
export interface IGetExpendituresResult {
  accnut_se_code: string;
  accnut_se_nm: string;
  accnut_year: number;
  administ_sfrnd_code: string;
  budget_crntam: string;
  cty: string;
  dept_code: string;
  detail_bsns_code: string;
  detail_bsns_nm: string;
  etc_crntam: string;
  excut_de: Date | null;
  expndtram: string;
  id: string;
  nxndr: string;
  orgnztnam: string;
  realm_code: string;
  realm_nm: string;
  sect_code: string;
  sect_nm: string;
  sfrnd_code: string;
  sfrnd_nm_korean: string;
  signgunon: string;
  wdr_sfrnd_code: string;
  wdr_sfrnd_code_nm: string;
}

/** 'GetExpenditures' query type */
export interface IGetExpendituresQuery {
  params: IGetExpendituresParams;
  result: IGetExpendituresResult;
}

const getExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  accnut_year,\n  wdr_sfrnd_code,\n  wdr_sfrnd_code_nm,\n  sfrnd_code,\n  sfrnd_nm_korean,\n  accnut_se_code,\n  accnut_se_nm,\n  dept_code,\n  detail_bsns_code,\n  detail_bsns_nm,\n  excut_de,\n  budget_crntam,\n  nxndr,\n  cty,\n  signgunon,\n  etc_crntam,\n  expndtram,\n  orgnztnam,\n  realm_code,\n  realm_nm,\n  sect_code,\n  sect_nm,\n  administ_sfrnd_code\nFROM expenditure\nWHERE wdr_sfrnd_code = $1\n  AND excut_de = $2\n  AND detail_bsns_code = ANY ($3)\nORDER BY budget_crntam DESC\nLIMIT $4"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   accnut_year,
 *   wdr_sfrnd_code,
 *   wdr_sfrnd_code_nm,
 *   sfrnd_code,
 *   sfrnd_nm_korean,
 *   accnut_se_code,
 *   accnut_se_nm,
 *   dept_code,
 *   detail_bsns_code,
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
 *   realm_nm,
 *   sect_code,
 *   sect_nm,
 *   administ_sfrnd_code
 * FROM expenditure
 * WHERE wdr_sfrnd_code = $1
 *   AND excut_de = $2
 *   AND detail_bsns_code = ANY ($3)
 * ORDER BY budget_crntam DESC
 * LIMIT $4
 * ```
 */
export const getExpenditures = new PreparedQuery<IGetExpendituresParams,IGetExpendituresResult>(getExpendituresIR);


