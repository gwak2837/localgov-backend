/** Types generated for queries found in "src/routes/localExpenditure/sql/getLocalExpendituresByField.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalExpendituresByField' parameters type */
export type IGetLocalExpendituresByFieldParams = void;

/** 'GetLocalExpendituresByField' return type */
export interface IGetLocalExpendituresByFieldResult {
  budget_crntam: string | null;
  cty: string | null;
  detail_bsns_nm: string;
  etc_crntam: string | null;
  expndtram: string | null;
  id: string;
  nxndr: string | null;
  orgnztnam: string | null;
  signgunon: string | null;
}

/** 'GetLocalExpendituresByField' query type */
export interface IGetLocalExpendituresByFieldQuery {
  params: IGetLocalExpendituresByFieldParams;
  result: IGetLocalExpendituresByFieldResult;
}

const getLocalExpendituresByFieldIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  detail_bsns_nm,\n  sum(budget_crntam) AS budget_crntam,\n  sum(nxndr) AS nxndr,\n  sum(cty) AS cty,\n  sum(signgunon) AS signgunon,\n  sum(etc_crntam) AS etc_crntam,\n  sum(expndtram) AS expndtram,\n  sum(orgnztnam) AS orgnztnam\nFROM local_expenditure\nWHERE excut_de BETWEEN $1 AND $2\n  AND (\n    $3::int IS NULL\n    OR CASE\n      WHEN $3 > 100 THEN sfrnd_code = $3\n      ELSE sfrnd_code >= $3 * 100000\n      AND sfrnd_code < ($3 + 1) * 100000\n    END\n  )\n  AND realm_code = $4\nGROUP BY id,\n  detail_bsns_nm\nORDER BY budget_crntam DESC\nLIMIT $5"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   detail_bsns_nm,
 *   sum(budget_crntam) AS budget_crntam,
 *   sum(nxndr) AS nxndr,
 *   sum(cty) AS cty,
 *   sum(signgunon) AS signgunon,
 *   sum(etc_crntam) AS etc_crntam,
 *   sum(expndtram) AS expndtram,
 *   sum(orgnztnam) AS orgnztnam
 * FROM local_expenditure
 * WHERE excut_de BETWEEN $1 AND $2
 *   AND (
 *     $3::int IS NULL
 *     OR CASE
 *       WHEN $3 > 100 THEN sfrnd_code = $3
 *       ELSE sfrnd_code >= $3 * 100000
 *       AND sfrnd_code < ($3 + 1) * 100000
 *     END
 *   )
 *   AND realm_code = $4
 * GROUP BY id,
 *   detail_bsns_nm
 * ORDER BY budget_crntam DESC
 * LIMIT $5
 * ```
 */
export const getLocalExpendituresByField = new PreparedQuery<IGetLocalExpendituresByFieldParams,IGetLocalExpendituresByFieldResult>(getLocalExpendituresByFieldIR);


