/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetEduCommitment' parameters type */
export type IGetEduCommitmentParams = void;

/** 'GetEduCommitment' return type */
export interface IGetEduCommitmentResult {
  title: string;
}

/** 'GetEduCommitment' query type */
export interface IGetEduCommitmentQuery {
  params: IGetEduCommitmentParams;
  result: IGetEduCommitmentResult;
}

const getEduCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT title\nFROM edu_commitment"};

/**
 * Query generated from SQL:
 * ```
 * SELECT title
 * FROM edu_commitment
 * ```
 */
export const getEduCommitment = new PreparedQuery<IGetEduCommitmentParams,IGetEduCommitmentResult>(getEduCommitmentIR);


