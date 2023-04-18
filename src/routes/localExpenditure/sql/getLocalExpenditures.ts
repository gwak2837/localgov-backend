/** Types generated for queries found in "src/routes/localExpenditure/sql/getLocalExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalExpenditures' parameters type */
export type IGetLocalExpendituresParams = void;

/** 'GetLocalExpenditures' return type */
export interface IGetLocalExpendituresResult {
  budget_crntam_sum: string | null;
  cty_sum: string | null;
  etc_crntam_sum: string | null;
  expndtram_sum: string | null;
  nxndr_sum: string | null;
  orgnztnam_sum: string | null;
  realm_code: number;
  signgunon_sum: string | null;
}

/** 'GetLocalExpenditures' query type */
export interface IGetLocalExpendituresQuery {
  params: IGetLocalExpendituresParams;
  result: IGetLocalExpendituresResult;
}

const getLocalExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT realm_code,\n  sum(budget_crntam) AS budget_crntam_sum,\n  sum(nxndr) AS nxndr_sum,\n  sum(cty) AS cty_sum,\n  sum(signgunon) AS signgunon_sum,\n  sum(etc_crntam) AS etc_crntam_sum,\n  sum(expndtram) AS expndtram_sum,\n  sum(orgnztnam) AS orgnztnam_sum\nFROM expenditure\nWHERE excut_de >= $1\n  AND excut_de <= $2\n  AND (\n    $3::int IS NULL\n    OR CASE\n      WHEN $4 THEN sfrnd_code >= $3\n      AND sfrnd_code < $3 + 100000\n      ELSE sfrnd_code = $3\n    END\n  )\nGROUP BY realm_code\nORDER BY budget_crntam_sum DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT realm_code,
 *   sum(budget_crntam) AS budget_crntam_sum,
 *   sum(nxndr) AS nxndr_sum,
 *   sum(cty) AS cty_sum,
 *   sum(signgunon) AS signgunon_sum,
 *   sum(etc_crntam) AS etc_crntam_sum,
 *   sum(expndtram) AS expndtram_sum,
 *   sum(orgnztnam) AS orgnztnam_sum
 * FROM expenditure
 * WHERE excut_de >= $1
 *   AND excut_de <= $2
 *   AND (
 *     $3::int IS NULL
 *     OR CASE
 *       WHEN $4 THEN sfrnd_code >= $3
 *       AND sfrnd_code < $3 + 100000
 *       ELSE sfrnd_code = $3
 *     END
 *   )
 * GROUP BY realm_code
 * ORDER BY budget_crntam_sum DESC
 * ```
 */
export const getLocalExpenditures = new PreparedQuery<IGetLocalExpendituresParams,IGetLocalExpendituresResult>(getLocalExpendituresIR);


