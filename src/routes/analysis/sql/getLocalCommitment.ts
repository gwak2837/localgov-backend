/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetLocalCommitment' is invalid, so its result is assigned type 'never' */
export type IGetLocalCommitmentResult = never;

/** Query 'GetLocalCommitment' is invalid, so its parameters are assigned type 'never' */
export type IGetLocalCommitmentParams = never;

const getLocalCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code AS who_code,\n  finance.basis_date AS when_date,\n  field_code AS field_code,\n  sector_code AS sector_code,\n  commitment.title,\n  content\nFROM commitment\n  JOIN finance ON finance.commitment_id = commitment.id\n  AND commitment.id = $1\nORDER BY finance.basis_date DESC\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code AS who_code,
 *   finance.basis_date AS when_date,
 *   field_code AS field_code,
 *   sector_code AS sector_code,
 *   commitment.title,
 *   content
 * FROM commitment
 *   JOIN finance ON finance.commitment_id = commitment.id
 *   AND commitment.id = $1
 * ORDER BY finance.basis_date DESC
 * LIMIT 1
 * ```
 */
export const getLocalCommitment = new PreparedQuery<IGetLocalCommitmentParams,IGetLocalCommitmentResult>(getLocalCommitmentIR);


