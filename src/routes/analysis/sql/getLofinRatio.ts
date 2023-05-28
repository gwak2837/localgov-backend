/** Types generated for queries found in "src/routes/analysis/sql/getLofinRatio.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLofinRatio' parameters type */
export type IGetLofinRatioParams = void;

/** 'GetLofinRatio' return type */
export interface IGetLofinRatioResult {
  budget_crntam: string | null;
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

const getLofinRatioIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT CASE\n    WHEN $4 THEN realm_code\n    ELSE sect_code\n  END,\n  SUM(budget_crntam) AS budget_crntam,\n  SUM(nxndr) AS nxndr,\n  SUM(cty) AS cty,\n  SUM(signgunon) AS signgunon,\n  SUM(etc_crntam) AS etc_crntam,\n  SUM(expndtram) AS expndtram,\n  SUM(orgnztnam) AS orgnztnam\nFROM local_expenditure\nWHERE sfrnd_code = $1\n  AND excut_de BETWEEN $2 AND $3\nGROUP BY CASE\n    WHEN $4 THEN realm_code\n    ELSE sect_code\n  END\nORDER BY budget_crntam"};

/**
 * Query generated from SQL:
 * ```
 * SELECT CASE
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
 * WHERE sfrnd_code = $1
 *   AND excut_de BETWEEN $2 AND $3
 * GROUP BY CASE
 *     WHEN $4 THEN realm_code
 *     ELSE sect_code
 *   END
 * ORDER BY budget_crntam
 * ```
 */
export const getLofinRatio = new PreparedQuery<IGetLofinRatioParams,IGetLofinRatioResult>(getLofinRatioIR);


