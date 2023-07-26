/** Types generated for queries found in "src/routes/commitment2/sql/createCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateCommitment' parameters type */
export type ICreateCommitmentParams = void;

/** 'CreateCommitment' return type */
export interface ICreateCommitmentResult {
  id: string;
}

/** 'CreateCommitment' query type */
export interface ICreateCommitmentQuery {
  params: ICreateCommitmentParams;
  result: ICreateCommitmentResult;
}

const createCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO commitment2 (prmsRealmName, prmsTitle, prmmCont, candidate_id)\nVALUES($1, $2, $3, $4)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO commitment2 (prmsRealmName, prmsTitle, prmmCont, candidate_id)
 * VALUES($1, $2, $3, $4)
 * RETURNING id
 * ```
 */
export const createCommitment = new PreparedQuery<ICreateCommitmentParams,ICreateCommitmentResult>(createCommitmentIR);


