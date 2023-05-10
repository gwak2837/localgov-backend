/** Types generated for queries found in "src/routes/commitment/sql/getCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommitments' parameters type */
export type IGetCommitmentsParams = void;

/** 'GetCommitments' return type */
export interface IGetCommitmentsResult {
  id: string;
}

/** 'GetCommitments' query type */
export interface IGetCommitmentsQuery {
  params: IGetCommitmentsParams;
  result: IGetCommitmentsResult;
}

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id\nFROM commitment"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id
 * FROM commitment
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


