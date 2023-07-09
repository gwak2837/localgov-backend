/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalCommitment' parameters type */
export type IGetLocalCommitmentParams = void;

/** 'GetLocalCommitment' return type */
export interface IGetLocalCommitmentResult {
  sfrnd_code: number;
  title: string;
}

/** 'GetLocalCommitment' query type */
export interface IGetLocalCommitmentQuery {
  params: IGetLocalCommitmentParams;
  result: IGetLocalCommitmentResult;
}

const getLocalCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code,\n  title\nFROM commitment\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code,
 *   title
 * FROM commitment
 * WHERE id = $1
 * ```
 */
export const getLocalCommitment = new PreparedQuery<IGetLocalCommitmentParams,IGetLocalCommitmentResult>(getLocalCommitmentIR);


