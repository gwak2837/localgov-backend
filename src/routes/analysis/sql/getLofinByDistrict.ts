/** Types generated for queries found in "src/routes/analysis/sql/getLofinByDistrict.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetLofinByDistrict' is invalid, so its result is assigned type 'never' */
export type IGetLofinByDistrictResult = never;

/** Query 'GetLofinByDistrict' is invalid, so its parameters are assigned type 'never' */
export type IGetLofinByDistrictParams = never;

const getLofinByDistrictIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  sum(budget_crntam) AS budget_crntam,\n  sum(nxndr) AS nxndr,\n  sum(cty) AS cty,\n  sum(signgunon) AS signgunon,\n  sum(etc_crntam) AS etc_crntam,\n  sum(expndtram) AS expndtram,\n  sum(orgnztnam) AS orgnztnam\nFROM local_expenditure\nWHERE sfrnd_code = $1\n  AND CASE\n    WHEN $2 THEN realm_code = $3\n    ELSE sect_code = $3\n  END\n  AND excut_de BETWEEN $4 AND $5\nORDER BY budget_crntam DESC"};

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
 * WHERE sfrnd_code = $1
 *   AND CASE
 *     WHEN $2 THEN realm_code = $3
 *     ELSE sect_code = $3
 *   END
 *   AND excut_de BETWEEN $4 AND $5
 * ORDER BY budget_crntam DESC
 * ```
 */
export const getLofinByDistrict = new PreparedQuery<IGetLofinByDistrictParams,IGetLofinByDistrictResult>(getLofinByDistrictIR);


