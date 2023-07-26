/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetEduCommitment' is invalid, so its result is assigned type 'never' */
export type IGetEduCommitmentResult = never;

/** Query 'GetEduCommitment' is invalid, so its parameters are assigned type 'never' */
export type IGetEduCommitmentParams = never;

const getEduCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code AS who_code,\n  edu_finance.basis_date AS when_date,\n  field_code AS field_code,\n  sector_code AS sector_code,\n  edu_commitment.title,\n  content\nFROM edu_commitment\n  JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id\n  AND edu_commitment.id = $1\nORDER BY edu_finance.basis_date DESC\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code AS who_code,
 *   edu_finance.basis_date AS when_date,
 *   field_code AS field_code,
 *   sector_code AS sector_code,
 *   edu_commitment.title,
 *   content
 * FROM edu_commitment
 *   JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
 *   AND edu_commitment.id = $1
 * ORDER BY edu_finance.basis_date DESC
 * LIMIT 1
 * ```
 */
export const getEduCommitment = new PreparedQuery<IGetEduCommitmentParams,IGetEduCommitmentResult>(getEduCommitmentIR);


