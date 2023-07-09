/** Types generated for queries found in "src/routes/commitment/sql/deleteCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'DeleteCommitments' parameters type */
export type IDeleteCommitmentsParams = void;

/** 'DeleteCommitments' return type */
export type IDeleteCommitmentsResult = void;

/** 'DeleteCommitments' query type */
export interface IDeleteCommitmentsQuery {
  params: IDeleteCommitmentsParams;
  result: IDeleteCommitmentsResult;
}

const deleteCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM commitment2\nWHERE id = ANY($1)"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM commitment2
 * WHERE id = ANY($1)
 * ```
 */
export const deleteCommitments = new PreparedQuery<IDeleteCommitmentsParams,IDeleteCommitmentsResult>(deleteCommitmentsIR);


