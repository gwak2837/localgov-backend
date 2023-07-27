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

const createAnswersIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO smartplus_answer(\n    answer,\n    business_id,\n    business_category,\n    question_id\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::bigint [],\n    $3::int [],\n    $4::bigint []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO smartplus_answer(
 *     answer,
 *     business_id,
 *     business_category,
 *     question_id
 *   )
 * SELECT *
 * FROM unnest(
 *     $1::int [],
 *     $2::bigint [],
 *     $3::int [],
 *     $4::bigint []
 *   )
 * ```
 */
export const createAnswers = new PreparedQuery<ICreateAnswersParams,ICreateAnswersResult>(createAnswersIR);


