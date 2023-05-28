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

const getLofinByDistrictIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  sum(budget_crntam) AS budget_crntam,\n  sum(nxndr) AS nxndr,\n  sum(cty) AS cty,\n  sum(signgunon) AS signgunon,\n  sum(etc_crntam) AS etc_crntam,\n  sum(expndtram) AS expndtram,\n  sum(orgnztnam) AS orgnztnam\nFROM local_expenditure\nWHERE CASE\n    WHEN $1 THEN realm_code = $2\n    ELSE sect_code = $2\n  END\n  AND excut_de BETWEEN $3 AND $4\nGROUP BY sfrnd_code\nORDER BY budget_crntam DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code,
 *   sum(budget_crntam) AS budget_crntam,
 *   sum(nxndr) AS nxndr,
 *   sum(cty) AS cty,
 *   sum(signgunon) AS signgunon,
 *   sum(etc_crntam) AS etc_crntam,
 *   sum(expndtram) AS expndtram,
 *   sum(orgnztnam) AS orgnztnam
 * FROM local_expenditure
 * WHERE CASE
 *     WHEN $1 THEN realm_code = $2
 *     ELSE sect_code = $2
 *   END
 *   AND excut_de BETWEEN $3 AND $4
 * GROUP BY sfrnd_code
 * ORDER BY budget_crntam DESC
 * ```
 */
export const getLofinByDistrict = new PreparedQuery<IGetLofinByDistrictParams,IGetLofinByDistrictResult>(getLofinByDistrictIR);


