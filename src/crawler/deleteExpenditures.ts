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

const deleteExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM expenditure\nWHERE wdr_sfrnd_code = $1\n  AND excut_de = $2"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM expenditure
 * WHERE wdr_sfrnd_code = $1
 *   AND excut_de = $2
 * ```
 */
export const deleteExpenditures = new PreparedQuery<IDeleteExpendituresParams,IDeleteExpendituresResult>(deleteExpendituresIR);


