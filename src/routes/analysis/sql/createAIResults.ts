/** Types generated for queries found in "src/routes/analysis/sql/createAIResults.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'CreateAiResults' is invalid, so its result is assigned type 'never' */
export type ICreateAiResultsResult = never;

/** Query 'CreateAiResults' is invalid, so its parameters are assigned type 'never' */
export type ICreateAiResultsParams = never;

const createAiResultsIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO ai (who, category, reference_id, kind, content)\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::int [],\n    $3::bigint [],\n    $4::int [],\n    $5::text []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO ai (who, category, reference_id, kind, content)
 * SELECT *
 * FROM unnest(
 *     $1::int [],
 *     $2::int [],
 *     $3::bigint [],
 *     $4::int [],
 *     $5::text []
 *   )
 * ```
 */
export const createAiResults = new PreparedQuery<ICreateAiResultsParams,ICreateAiResultsResult>(createAiResultsIR);


