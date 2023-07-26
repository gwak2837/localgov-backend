/** Types generated for queries found in "src/routes/commitment/sql/getFiscalYears.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetFiscalYears' parameters type */
export type IGetFiscalYearsParams = void;

/** 'GetFiscalYears' return type */
export interface IGetFiscalYearsResult {
  fiscal_year: number | null;
}

/** 'GetFiscalYears' query type */
export interface IGetFiscalYearsQuery {
  params: IGetFiscalYearsParams;
  result: IGetFiscalYearsResult;
}

const getFiscalYearsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT fiscal_year\nFROM finance\nWHERE fiscal_year IS NOT NULL\nORDER BY fiscal_year"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT fiscal_year
 * FROM finance
 * WHERE fiscal_year IS NOT NULL
 * ORDER BY fiscal_year
 * ```
 */
export const getFiscalYears = new PreparedQuery<IGetFiscalYearsParams,IGetFiscalYearsResult>(getFiscalYearsIR);


