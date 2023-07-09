/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetEduCommitment' parameters type */
export type IGetEduCommitmentParams = void;

/** 'GetEduCommitment' return type */
export interface IGetEduCommitmentResult {
  sfrnd_code: number;
  title: string;
}

/** 'GetEduCommitment' query type */
export interface IGetEduCommitmentQuery {
  params: IGetEduCommitmentParams;
  result: IGetEduCommitmentResult;
}

const getEduCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  title\nFROM edu_commitment\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code,
 *   title
 * FROM edu_commitment
 * WHERE id = $1
 * ```
 */
export const getEduCommitment = new PreparedQuery<IGetEduCommitmentParams,IGetEduCommitmentResult>(getEduCommitmentIR);


