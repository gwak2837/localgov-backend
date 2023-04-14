/** Types generated for queries found in "src/crawler/countCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CountCenterExpenditures' parameters type */
export type ICountCenterExpendituresParams = void;

/** 'CountCenterExpenditures' return type */
export interface ICountCenterExpendituresResult {
  count: string | null;
}

/** 'CountCenterExpenditures' query type */
export interface ICountCenterExpendituresQuery {
  params: ICountCenterExpendituresParams;
  result: ICountCenterExpendituresResult;
}

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


