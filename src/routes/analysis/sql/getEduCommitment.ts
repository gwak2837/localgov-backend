/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetEduCommitment' parameters type */
export type IGetEduCommitmentParams = void;

/** 'GetEduCommitment' return type */
export interface IGetEduCommitmentResult {
  content: string;
  field_code: number;
  sector_code: number | null;
  title: string;
  when_date: Date;
  who_code: number;
}

/** 'GetEduCommitment' query type */
export interface IGetEduCommitmentQuery {
  params: IGetEduCommitmentParams;
  result: IGetEduCommitmentResult;
}

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


