/** Types generated for queries found in "src/routes/localExpenditure/sql/getLocalExpendituresByRealm.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalExpendituresByRealm' parameters type */
export type IGetLocalExpendituresByRealmParams = void;

/** 'GetLocalExpendituresByRealm' return type */
export interface IGetLocalExpendituresByRealmResult {
  budget_crntam_sum: string | null;
  cty_sum: string | null;
  detail_bsns_nm: string;
  etc_crntam_sum: string | null;
  expndtram_sum: string | null;
  nxndr_sum: string | null;
  orgnztnam_sum: string | null;
  signgunon_sum: string | null;
}

/** 'GetLocalExpendituresByRealm' query type */
export interface IGetLocalExpendituresByRealmQuery {
  params: IGetLocalExpendituresByRealmParams;
  result: IGetLocalExpendituresByRealmResult;
}

const getLocalExpendituresByRealmIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT detail_bsns_nm,\n  sum(budget_crntam) AS budget_crntam_sum,\n  sum(nxndr) AS nxndr_sum,\n  sum(cty) AS cty_sum,\n  sum(signgunon) AS signgunon_sum,\n  sum(etc_crntam) AS etc_crntam_sum,\n  sum(expndtram) AS expndtram_sum,\n  sum(orgnztnam) AS orgnztnam_sum\nFROM local_expenditure\nWHERE (\n    $1::int IS NULL\n    OR CASE\n      WHEN $2 THEN sfrnd_code >= $1\n      AND sfrnd_code < $1 + 100000\n      ELSE sfrnd_code = $1\n    END\n  )\n  AND excut_de BETWEEN $3 AND $4\n  AND realm_code = $5\nGROUP BY detail_bsns_nm\nORDER BY budget_crntam_sum DESC\nLIMIT $6"};

/**
 * Query generated from SQL:
 * ```
 * SELECT detail_bsns_nm,
 *   sum(budget_crntam) AS budget_crntam_sum,
 *   sum(nxndr) AS nxndr_sum,
 *   sum(cty) AS cty_sum,
 *   sum(signgunon) AS signgunon_sum,
 *   sum(etc_crntam) AS etc_crntam_sum,
 *   sum(expndtram) AS expndtram_sum,
 *   sum(orgnztnam) AS orgnztnam_sum
 * FROM local_expenditure
 * WHERE (
 *     $1::int IS NULL
 *     OR CASE
 *       WHEN $2 THEN sfrnd_code >= $1
 *       AND sfrnd_code < $1 + 100000
 *       ELSE sfrnd_code = $1
 *     END
 *   )
 *   AND excut_de BETWEEN $3 AND $4
 *   AND realm_code = $5
 * GROUP BY detail_bsns_nm
 * ORDER BY budget_crntam_sum DESC
 * LIMIT $6
 * ```
 */
export const getLocalExpendituresByRealm = new PreparedQuery<IGetLocalExpendituresByRealmParams,IGetLocalExpendituresByRealmResult>(getLocalExpendituresByRealmIR);


