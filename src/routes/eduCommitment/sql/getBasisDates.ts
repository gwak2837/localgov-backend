/** Types generated for queries found in "src/routes/eduCommitment/sql/getBasisDates.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetBasisDate' is invalid, so its result is assigned type 'never' */
export type IGetBasisDateResult = never;

/** Query 'GetBasisDate' is invalid, so its parameters are assigned type 'never' */
export type IGetBasisDateParams = never;

const getBasisDateIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT basis_date\nFROM edu_finance\nORDER BY basis_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT basis_date
 * FROM edu_finance
 * ORDER BY basis_date DESC
 * ```
 */
export const getBasisDate = new PreparedQuery<IGetBasisDateParams,IGetBasisDateResult>(getBasisDateIR);


