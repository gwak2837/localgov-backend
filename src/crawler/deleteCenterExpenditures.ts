/** Types generated for queries found in "src/crawler/deleteCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'DeleteCenterExpenditures' parameters type */
export type IDeleteCenterExpendituresParams = void;

/** 'DeleteCenterExpenditures' return type */
export type IDeleteCenterExpendituresResult = void;

/** 'DeleteCenterExpenditures' query type */
export interface IDeleteCenterExpendituresQuery {
  params: IDeleteCenterExpendituresParams;
  result: IDeleteCenterExpendituresResult;
}

const deleteCenterExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM center_expenditure\nWHERE FSCL_YY = $1"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM center_expenditure
 * WHERE FSCL_YY = $1
 * ```
 */
export const deleteCenterExpenditures = new PreparedQuery<IDeleteCenterExpendituresParams,IDeleteCenterExpendituresResult>(deleteCenterExpendituresIR);


