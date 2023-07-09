/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromLofin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetPromptFromCefin' parameters type */
export type IGetPromptFromCefinParams = void;

/** 'GetPromptFromCefin' return type */
export interface IGetPromptFromCefinResult {
  field_code: number;
  sector_code: number | null;
  title: string;
  when_year: number | null;
  who_code: number;
}

/** 'GetPromptFromCefin' query type */
export interface IGetPromptFromCefinQuery {
  params: IGetPromptFromCefinParams;
  result: IGetPromptFromCefinResult;
}

const getPromptFromCefinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code AS who_code,\n  DATE_PART('year', excut_de) AS when_year,\n  realm_code AS field_code,\n  sect_code AS sector_code,\n  detail_bsns_nm AS title\nFROM local_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code AS who_code,
 *   DATE_PART('year', excut_de) AS when_year,
 *   realm_code AS field_code,
 *   sect_code AS sector_code,
 *   detail_bsns_nm AS title
 * FROM local_expenditure
 * WHERE id = $1
 * ```
 */
export const getPromptFromCefin = new PreparedQuery<IGetPromptFromCefinParams,IGetPromptFromCefinResult>(getPromptFromCefinIR);


