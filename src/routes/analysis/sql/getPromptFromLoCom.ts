/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromLoCom.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetPromptFromLoCom' is invalid, so its result is assigned type 'never' */
export type IGetPromptFromLoComResult = never;

/** Query 'GetPromptFromLoCom' is invalid, so its parameters are assigned type 'never' */
export type IGetPromptFromLoComParams = never;

const getPromptFromLoComIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code AS who_code,\n  finance.basis_date AS when_,\n  field_code,\n  sector_code,\n  commitment.title\nFROM commitment\n  JOIN finance ON finance.commitment_id = commitment.id\n  AND commitment.id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code AS who_code,
 *   finance.basis_date AS when_,
 *   field_code,
 *   sector_code,
 *   commitment.title
 * FROM commitment
 *   JOIN finance ON finance.commitment_id = commitment.id
 *   AND commitment.id = $1
 * ```
 */
export const getPromptFromLoCom = new PreparedQuery<IGetPromptFromLoComParams,IGetPromptFromLoComResult>(getPromptFromLoComIR);


