/** Types generated for queries found in "src/crawler/countExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CountExpenditures' parameters type */
export type ICountExpendituresParams = void;

/** 'CountExpenditures' return type */
export interface ICountExpendituresResult {
  count: string | null;
}

/** 'CountExpenditures' query type */
export interface ICountExpendituresQuery {
  params: ICountExpendituresParams;
  result: ICountExpendituresResult;
}

const countExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(id)\nFROM expenditure\nWHERE excut_de = $1\n  AND sfrnd_code >= $2\n  AND sfrnd_code < $2 + 100000"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(id)
 * FROM expenditure
 * WHERE excut_de = $1
 *   AND sfrnd_code >= $2
 *   AND sfrnd_code < $2 + 100000
 * ```
 */
export const countExpenditures = new PreparedQuery<ICountExpendituresParams,ICountExpendituresResult>(countExpendituresIR);


