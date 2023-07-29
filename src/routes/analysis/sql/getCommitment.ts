/** Types generated for queries found in "src/routes/analysis/sql/getCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommitment' parameters type */
export type IGetCommitmentParams = void;

/** 'GetCommitment' return type */
export interface IGetCommitmentResult {
  content: string | null;
  field_code: number;
  sector_code: number | null;
  title: string;
  when_date: Date;
  who_code: number | null;
}

/** 'GetCommitment' query type */
export interface IGetCommitmentQuery {
  params: IGetCommitmentParams;
  result: IGetCommitmentResult;
}

const getCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT election.district AS who_code,\n  finance.basis_date AS when_date,\n  field_code AS field_code,\n  sector_code AS sector_code,\n  commitment.title,\n  content\nFROM commitment\n  JOIN election ON election.id = commitment.election_id\n  JOIN finance ON finance.commitment_id = commitment.id\n  AND commitment.id = $1\nORDER BY finance.basis_date DESC\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT election.district AS who_code,
 *   finance.basis_date AS when_date,
 *   field_code AS field_code,
 *   sector_code AS sector_code,
 *   commitment.title,
 *   content
 * FROM commitment
 *   JOIN election ON election.id = commitment.election_id
 *   JOIN finance ON finance.commitment_id = commitment.id
 *   AND commitment.id = $1
 * ORDER BY finance.basis_date DESC
 * LIMIT 1
 * ```
 */
export const getCommitment = new PreparedQuery<IGetCommitmentParams,IGetCommitmentResult>(getCommitmentIR);


