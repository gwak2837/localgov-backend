/** Types generated for queries found in "src/routes/candidate/sql/deleteCandidates.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'DeleteCandidates' parameters type */
export type IDeleteCandidatesParams = void;

/** 'DeleteCandidates' return type */
export type IDeleteCandidatesResult = void;

/** 'DeleteCandidates' query type */
export interface IDeleteCandidatesQuery {
  params: IDeleteCandidatesParams;
  result: IDeleteCandidatesResult;
}

const deleteCandidatesIR: any = {"usedParamSet":{},"params":[],"statement":"DELETE FROM candidate\nWHERE id = ANY($1)"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM candidate
 * WHERE id = ANY($1)
 * ```
 */
export const deleteCandidates = new PreparedQuery<IDeleteCandidatesParams,IDeleteCandidatesResult>(deleteCandidatesIR);


