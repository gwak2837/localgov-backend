/** Types generated for queries found in "src/crawler/deleteCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'DeleteCenterExpenditures' is invalid, so its result is assigned type 'never' */
export type IDeleteCenterExpendituresResult = never;

/** Query 'DeleteCenterExpenditures' is invalid, so its parameters are assigned type 'never' */
export type IDeleteCenterExpendituresParams = never;

const deleteCenterExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM center_expenditure\nWHERE FSCL_YY = $1"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM center_expenditure
 * WHERE FSCL_YY = $1
 * ```
 */
export const deleteCenterExpenditures = new PreparedQuery<IDeleteCenterExpendituresParams,IDeleteCenterExpendituresResult>(deleteCenterExpendituresIR);


