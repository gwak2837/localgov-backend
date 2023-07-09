/** Types generated for queries found in "src/routes/analysis/sql/getAIResult.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAiResult' parameters type */
export type IGetAiResultParams = void;

/** 'GetAiResult' return type */
export interface IGetAiResultResult {
  content: string;
  creation_date: Date;
  id: string;
  kind: number;
  who: number;
}

/** 'GetAiResult' query type */
export interface IGetAiResultQuery {
  params: IGetAiResultParams;
  result: IGetAiResultResult;
}

const getAiResultIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  creation_date,\n  who,\n  kind,\n  content\nFROM ai\nWHERE creation_date > CURRENT_TIMESTAMP - INTERVAL '1 day'\n  AND creation_date < CURRENT_TIMESTAMP\n  AND category = $1\n  AND reference_id = $2"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   creation_date,
 *   who,
 *   kind,
 *   content
 * FROM ai
 * WHERE creation_date > CURRENT_TIMESTAMP - INTERVAL '1 day'
 *   AND creation_date < CURRENT_TIMESTAMP
 *   AND category = $1
 *   AND reference_id = $2
 * ```
 */
export const getAiResult = new PreparedQuery<IGetAiResultParams,IGetAiResultResult>(getAiResultIR);


