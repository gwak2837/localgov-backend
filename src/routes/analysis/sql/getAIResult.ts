/** Types generated for queries found in "src/routes/analysis/sql/getAIResult.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAiResult' parameters type */
export type IGetAiResultParams = void;

/** 'GetAiResult' return type */
export interface IGetAiResultResult {
  category: number;
  content: string;
  creation_date: Date;
  id: string;
  who: number;
}

/** 'GetAiResult' query type */
export interface IGetAiResultQuery {
  params: IGetAiResultParams;
  result: IGetAiResultResult;
}

const getAiResultIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  creation_date,\n  who,\n  category,\n  content\nFROM ai\nWHERE creation_date > CURRENT_TIMESTAMP - INTERVAL '1 day'\n  AND creation_date < CURRENT_TIMESTAMP\n  AND business_id = $1\n  AND business_category = $2\n  AND commitment_id = $3"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   creation_date,
 *   who,
 *   category,
 *   content
 * FROM ai
 * WHERE creation_date > CURRENT_TIMESTAMP - INTERVAL '1 day'
 *   AND creation_date < CURRENT_TIMESTAMP
 *   AND business_id = $1
 *   AND business_category = $2
 *   AND commitment_id = $3
 * ```
 */
export const getAiResult = new PreparedQuery<IGetAiResultParams,IGetAiResultResult>(getAiResultIR);


