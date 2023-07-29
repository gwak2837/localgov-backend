/** Types generated for queries found in "src/routes/smartplus/sql/createAnswers.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateAnswers' parameters type */
export type ICreateAnswersParams = void;

/** 'CreateAnswers' return type */
export type ICreateAnswersResult = void;

/** 'CreateAnswers' query type */
export interface ICreateAnswersQuery {
  params: ICreateAnswersParams;
  result: ICreateAnswersResult;
}

const createAnswersIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO smartplus_answer(\n    business_id,\n    business_category,\n    question_id,\n    user_id,\n    answer\n  )\nSELECT *\nFROM unnest(\n    $1::bigint [],\n    $2::int [],\n    $3::bigint [],\n    $4::bigint [],\n    $5::int []\n  ) ON CONFLICT (\n    business_id,\n    business_category,\n    question_id,\n    user_id\n  ) DO\nUPDATE\nSET answer = EXCLUDED.answer"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO smartplus_answer(
 *     business_id,
 *     business_category,
 *     question_id,
 *     user_id,
 *     answer
 *   )
 * SELECT *
 * FROM unnest(
 *     $1::bigint [],
 *     $2::int [],
 *     $3::bigint [],
 *     $4::bigint [],
 *     $5::int []
 *   ) ON CONFLICT (
 *     business_id,
 *     business_category,
 *     question_id,
 *     user_id
 *   ) DO
 * UPDATE
 * SET answer = EXCLUDED.answer
 * ```
 */
export const createAnswers = new PreparedQuery<ICreateAnswersParams,ICreateAnswersResult>(createAnswersIR);


