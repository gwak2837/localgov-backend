/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromCefin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetPromptFromCefin' parameters type */
export type IGetPromptFromCefinParams = void;

/** 'GetPromptFromCefin' return type */
export interface IGetPromptFromCefinResult {
  field: string;
  sector: string;
  title: string;
  when_year: number;
  who_name: string | null;
}

/** 'GetPromptFromCefin' query type */
export interface IGetPromptFromCefinQuery {
  params: IGetPromptFromCefinParams;
  result: IGetPromptFromCefinResult;
}

const getPromptFromCefinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT offc_nm AS who_name,\n  fscl_yy AS when_year,\n  fld_nm AS field,\n  sect_nm AS sector,\n  sactv_nm AS title\nFROM center_expenditure\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT offc_nm AS who_name,
 *   fscl_yy AS when_year,
 *   fld_nm AS field,
 *   sect_nm AS sector,
 *   sactv_nm AS title
 * FROM center_expenditure
 * WHERE id = $1
 * ```
 */
export const getPromptFromCefin = new PreparedQuery<IGetPromptFromCefinParams,IGetPromptFromCefinResult>(getPromptFromCefinIR);


