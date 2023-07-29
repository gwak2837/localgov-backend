/** Types generated for queries found in "src/routes/smartplus/sql/getAnswers.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAnswers' parameters type */
export type IGetAnswersParams = void;

/** 'GetAnswers' return type */
export interface IGetAnswersResult {
  answer: number;
  question_id: string;
}

/** 'GetAnswers' query type */
export interface IGetAnswersQuery {
  params: IGetAnswersParams;
  result: IGetAnswersResult;
}

const getAnswersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT answer,\n  question_id\nFROM smartplus_answer\nWHERE business_id = $1\n  AND business_category = $2\n  AND(\n    $3::bigint IS NULL\n    OR user_id = $3\n  )"};

/**
 * Query generated from SQL:
 * ```
 * SELECT answer,
 *   question_id
 * FROM smartplus_answer
 * WHERE business_id = $1
 *   AND business_category = $2
 *   AND(
 *     $3::bigint IS NULL
 *     OR user_id = $3
 *   )
 * ```
 */
export const getAnswers = new PreparedQuery<IGetAnswersParams,IGetAnswersResult>(getAnswersIR);


