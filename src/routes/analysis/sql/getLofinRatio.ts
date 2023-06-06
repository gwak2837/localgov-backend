/** Types generated for queries found in "src/routes/analysis/sql/getLofinRatio.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLofinRatio' parameters type */
export type IGetLofinRatioParams = void;

/** 'GetLofinRatio' return type */
export interface IGetLofinRatioResult {
  budget_crntam: string | null;
  case: number | null;
  cty: string | null;
  etc_crntam: string | null;
  expndtram: string | null;
  nxndr: string | null;
  orgnztnam: string | null;
  sect_code: number | null;
  signgunon: string | null;
}

/** 'GetLofinRatio' query type */
export interface IGetLofinRatioQuery {
  params: IGetLofinRatioParams;
  result: IGetLofinRatioResult;
}

const getLofinRatioIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT CASE\n    WHEN $3::int IS NULL\n    OR $3 < 100 THEN sfrnd_code\n  END,\n  CASE\n    WHEN $4 THEN realm_code\n    ELSE sect_code\n  END,\n  SUM(budget_crntam) AS budget_crntam,\n  SUM(nxndr) AS nxndr,\n  SUM(cty) AS cty,\n  SUM(signgunon) AS signgunon,\n  SUM(etc_crntam) AS etc_crntam,\n  SUM(expndtram) AS expndtram,\n  SUM(orgnztnam) AS orgnztnam\nFROM local_expenditure\nWHERE excut_de BETWEEN $1 AND $2\n  AND (\n    $3::int IS NULL\n    OR CASE\n      WHEN $3 > 100 THEN sfrnd_code = $3\n      ELSE sfrnd_code >= $3 * 100000\n      AND sfrnd_code < ($3 + 1) * 100000\n    END\n  )\nGROUP BY sfrnd_code,\n  CASE\n    WHEN $4 THEN realm_code\n    ELSE sect_code\n  END\nORDER BY sfrnd_code,\n  budget_crntam DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT CASE
 *     WHEN $3::int IS NULL
 *     OR $3 < 100 THEN sfrnd_code
 *   END,
 *   CASE
 *     WHEN $4 THEN realm_code
 *     ELSE sect_code
 *   END,
 *   SUM(budget_crntam) AS budget_crntam,
 *   SUM(nxndr) AS nxndr,
 *   SUM(cty) AS cty,
 *   SUM(signgunon) AS signgunon,
 *   SUM(etc_crntam) AS etc_crntam,
 *   SUM(expndtram) AS expndtram,
 *   SUM(orgnztnam) AS orgnztnam
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
 * GROUP BY sfrnd_code,
 *   CASE
 *     WHEN $4 THEN realm_code
 *     ELSE sect_code
 *   END
 * ORDER BY sfrnd_code,
 *   budget_crntam DESC
 * ```
 */
export const getLofinRatio = new PreparedQuery<IGetLofinRatioParams,IGetLofinRatioResult>(getLofinRatioIR);


