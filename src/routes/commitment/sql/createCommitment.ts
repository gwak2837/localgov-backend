/** Types generated for queries found in "src/routes/commitment/sql/createCommitment.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'CreateCommitment' is invalid, so its result is assigned type 'never' */
export type ICreateCommitmentResult = never;

/** Query 'CreateCommitment' is invalid, so its parameters are assigned type 'never' */
export type ICreateCommitmentParams = never;

const createCommitmentIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO commitment (prmsRealmName, prmsTitle, prmmCont, candidate_id)\nVALUES($1, $2, $3, $4)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO commitment (prmsRealmName, prmsTitle, prmmCont, candidate_id)
 * VALUES($1, $2, $3, $4)
 * RETURNING id
 * ```
 */
export const createCommitment = new PreparedQuery<ICreateCommitmentParams,ICreateCommitmentResult>(createCommitmentIR);


