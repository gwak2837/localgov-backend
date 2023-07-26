/** Types generated for queries found in "src/routes/eduCommitment/sql/getFiscalYears.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetFiscalYears' is invalid, so its result is assigned type 'never' */
export type IGetFiscalYearsResult = never;

/** Query 'GetFiscalYears' is invalid, so its parameters are assigned type 'never' */
export type IGetFiscalYearsParams = never;

const getFiscalYearsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT fiscal_year\nFROM edu_finance\nWHERE fiscal_year IS NOT NULL\nORDER BY fiscal_year"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT fiscal_year
 * FROM edu_finance
 * WHERE fiscal_year IS NOT NULL
 * ORDER BY fiscal_year
 * ```
 */
export const getFiscalYears = new PreparedQuery<IGetFiscalYearsParams,IGetFiscalYearsResult>(getFiscalYearsIR);


