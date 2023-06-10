/** Types generated for queries found in "src/routes/analysis/sql/getLofinByDistrict.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLofinByDistrict' parameters type */
export type IGetLofinByDistrictParams = void;

/** 'GetLofinByDistrict' return type */
export interface IGetLofinByDistrictResult {
  budget_crntam: string | null;
  cty: string | null;
  etc_crntam: string | null;
  expndtram: string | null;
  nxndr: string | null;
  orgnztnam: string | null;
  sfrnd_code: number;
  signgunon: string | null;
}

/** 'GetLofinByDistrict' query type */
export interface IGetLofinByDistrictQuery {
  params: IGetLofinByDistrictParams;
  result: IGetLofinByDistrictResult;
}

const getLofinByDistrictIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  SUM(budget_crntam) AS budget_crntam,\n  sum(nxndr) AS nxndr,\n  sum(cty) AS cty,\n  sum(signgunon) AS signgunon,\n  sum(etc_crntam) AS etc_crntam,\n  sum(expndtram) AS expndtram,\n  sum(orgnztnam) AS orgnztnam\nFROM local_expenditure\nWHERE excut_de BETWEEN $1 AND $2\n  AND CASE\n    WHEN $3 THEN realm_code = ANY ($4)\n    ELSE sect_code = ANY ($4)\n  END\nGROUP BY sfrnd_code\nORDER BY budget_crntam DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code,
 *   SUM(budget_crntam) AS budget_crntam,
 *   sum(nxndr) AS nxndr,
 *   sum(cty) AS cty,
 *   sum(signgunon) AS signgunon,
 *   sum(etc_crntam) AS etc_crntam,
 *   sum(expndtram) AS expndtram,
 *   sum(orgnztnam) AS orgnztnam
 * FROM local_expenditure
 * WHERE excut_de BETWEEN $1 AND $2
 *   AND CASE
 *     WHEN $3 THEN realm_code = ANY ($4)
 *     ELSE sect_code = ANY ($4)
 *   END
 * GROUP BY sfrnd_code
 * ORDER BY budget_crntam DESC
 * ```
 */
export const getLofinByDistrict = new PreparedQuery<IGetLofinByDistrictParams,IGetLofinByDistrictResult>(getLofinByDistrictIR);


