/** Types generated for queries found in "src/routes/expenditure/sql/getExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetExpenditures' parameters type */
export type IGetExpendituresParams = void;

/** 'GetExpenditures' return type */
export interface IGetExpendituresResult {
  budget_crntam: string;
  cty: string;
  detail_bsns_nm: string;
  etc_crntam: string;
  excut_de: Date | null;
  expndtram: string;
  id: string;
  nxndr: string;
  orgnztnam: string;
  realm_code: number;
  sect_code: number;
  sfrnd_code: number;
  signgunon: string;
}

/** 'GetExpenditures' query type */
export interface IGetExpendituresQuery {
  params: IGetExpendituresParams;
  result: IGetExpendituresResult;
}

const getExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  sfrnd_code,\n  detail_bsns_nm,\n  excut_de,\n  budget_crntam,\n  nxndr,\n  cty,\n  signgunon,\n  etc_crntam,\n  expndtram,\n  orgnztnam,\n  realm_code,\n  sect_code\nFROM expenditure\nWHERE excut_de = $1\n  AND (\n    $2::int IS NULL\n    OR CASE\n      WHEN $3 THEN sfrnd_code >= $2\n      AND sfrnd_code < $2 + 100000\n      ELSE sfrnd_code = $2\n    END\n  )\n  AND (\n    $4::int [] IS NULL\n    OR realm_code = ANY ($4)\n  )\nORDER BY budget_crntam DESC\nLIMIT $5"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   sfrnd_code,
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
 * FROM expenditure
 * WHERE excut_de = $1
 *   AND (
 *     $2::int IS NULL
 *     OR CASE
 *       WHEN $3 THEN sfrnd_code >= $2
 *       AND sfrnd_code < $2 + 100000
 *       ELSE sfrnd_code = $2
 *     END
 *   )
 *   AND (
 *     $4::int [] IS NULL
 *     OR realm_code = ANY ($4)
 *   )
 * ORDER BY budget_crntam DESC
 * LIMIT $5
 * ```
 */
export const getExpenditures = new PreparedQuery<IGetExpendituresParams,IGetExpendituresResult>(getExpendituresIR);


