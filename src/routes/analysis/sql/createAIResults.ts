/** Types generated for queries found in "src/routes/analysis/sql/createAIResults.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateAiResults' parameters type */
export type ICreateAiResultsParams = void;

/** 'CreateAiResults' return type */
export type ICreateAiResultsResult = void;

/** 'CreateAiResults' query type */
export interface ICreateAiResultsQuery {
  params: ICreateAiResultsParams;
  result: ICreateAiResultsResult;
}

const createAiResultsIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO ai (\n    who,\n    business_id,\n    business_category,\n    commitment_id,\n    category,\n    content\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::bigint [],\n    $3::int [],\n    $4::bigint [],\n    $5::int [],\n    $6::text []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO ai (
 *     who,
 *     business_id,
 *     business_category,
 *     commitment_id,
 *     category,
 *     content
 *   )
 * SELECT *
 * FROM unnest(
 *     $1::int [],
 *     $2::bigint [],
 *     $3::int [],
 *     $4::bigint [],
 *     $5::int [],
 *     $6::text []
 *   )
 * ```
 */
export const createAiResults = new PreparedQuery<ICreateAiResultsParams,ICreateAiResultsResult>(createAiResultsIR);


