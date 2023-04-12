/** Types generated for queries found in "src/crawler/countCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'CountCenterExpenditures' is invalid, so its result is assigned type 'never' */
export type ICountCenterExpendituresResult = never;

/** Query 'CountCenterExpenditures' is invalid, so its parameters are assigned type 'never' */
export type ICountCenterExpendituresParams = never;

const countCenterExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(id)\nFROM center_expenditure\nWHERE FSCL_YY = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(id)
 * FROM center_expenditure
 * WHERE FSCL_YY = $1
 * ```
 */
export const countCenterExpenditures = new PreparedQuery<ICountCenterExpendituresParams,ICountCenterExpendituresResult>(countCenterExpendituresIR);


