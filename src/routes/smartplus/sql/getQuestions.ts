/** Types generated for queries found in "src/routes/smartplus/sql/getQuestions.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetQuestion' parameters type */
export type IGetQuestionParams = void;

/** 'GetQuestion' return type */
export interface IGetQuestionResult {
  category: number;
  content: string;
  id: string;
  is_visible: boolean;
}

/** 'GetQuestion' query type */
export interface IGetQuestionQuery {
  params: IGetQuestionParams;
  result: IGetQuestionResult;
}

const getQuestionIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  content,\n  category,\n  is_visible\nFROM smartplus_question\nWHERE is_visible = TRUE"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   content,
 *   category,
 *   is_visible
 * FROM smartplus_question
 * WHERE is_visible = TRUE
 * ```
 */
export const getQuestion = new PreparedQuery<IGetQuestionParams,IGetQuestionResult>(getQuestionIR);


