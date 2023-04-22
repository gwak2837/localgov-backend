/** Types generated for queries found in "src/crawler/deleteExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'DeleteExpenditures' parameters type */
export type IDeleteExpendituresParams = void;

/** 'DeleteExpenditures' return type */
export type IDeleteExpendituresResult = void;

/** 'DeleteExpenditures' query type */
export interface IDeleteExpendituresQuery {
  params: IDeleteExpendituresParams;
  result: IDeleteExpendituresResult;
}

const deleteExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM local_expenditure\nWHERE excut_de = $1\n  AND sfrnd_code >= $2\n  AND sfrnd_code < $2 + 100000"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM local_expenditure
 * WHERE excut_de = $1
 *   AND sfrnd_code >= $2
 *   AND sfrnd_code < $2 + 100000
 * ```
 */
export const deleteExpenditures = new PreparedQuery<IDeleteExpendituresParams,IDeleteExpendituresResult>(deleteExpendituresIR);


