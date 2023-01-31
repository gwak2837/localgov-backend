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

const countExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(id)\nFROM expenditure\nWHERE wdr_sfrnd_code = $1\n  AND excut_de = $2"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(id)
 * FROM expenditure
 * WHERE wdr_sfrnd_code = $1
 *   AND excut_de = $2
 * ```
 */
export const countExpenditures = new PreparedQuery<ICountExpendituresParams,ICountExpendituresResult>(countExpendituresIR);


