/** Types generated for queries found in "src/routes/analysis/sql/getLofinBusiness.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLofinBusiness' parameters type */
export type IGetLofinBusinessParams = void;

/** 'GetLofinBusiness' return type */
export interface IGetLofinBusinessResult {
  etc: string;
  expndtram: string;
  field_code: number;
  gov: string;
  orgnztnam: string;
  sector_code: number | null;
  sido: string;
  sigungu: string;
  title: string;
  when_year: number | null;
  who_code: number;
}

/** 'GetLofinBusiness' query type */
export interface IGetLofinBusinessQuery {
  params: IGetLofinBusinessParams;
  result: IGetLofinBusinessResult;
}

const getLofinBusinessIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code AS who_code,\n  DATE_PART('year', excut_de) AS when_year,\n  realm_code AS field_code,\n  sect_code AS sector_code,\n  detail_bsns_nm AS title,\n  nxndr AS gov,\n  cty AS sido,\n  signgunon AS sigungu,\n  etc_crntam AS etc,\n  expndtram,\n  orgnztnam\nFROM local_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code AS who_code,
 *   DATE_PART('year', excut_de) AS when_year,
 *   realm_code AS field_code,
 *   sect_code AS sector_code,
 *   detail_bsns_nm AS title,
 *   nxndr AS gov,
 *   cty AS sido,
 *   signgunon AS sigungu,
 *   etc_crntam AS etc,
 *   expndtram,
 *   orgnztnam
 * FROM local_expenditure
 * WHERE id = $1
 * ```
 */
export const getLofinBusiness = new PreparedQuery<IGetLofinBusinessParams,IGetLofinBusinessResult>(getLofinBusinessIR);


