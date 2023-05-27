/** Types generated for queries found in "src/routes/candidate/sql/createCandidate.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'CreateCandidate' is invalid, so its result is assigned type 'never' */
export type ICreateCandidateResult = never;

/** Query 'CreateCandidate' is invalid, so its parameters are assigned type 'never' */
export type ICreateCandidateParams = never;

const createCandidateIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO candidate(\n    sgId,\n    sgName,\n    sgTypecode,\n    sggName,\n    sidoName,\n    wiwName,\n    partyName,\n    krName\n  )\nVALUES ($1, $2, $3, $4, $5, $6, $7, $8)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO candidate(
 *     sgId,
 *     sgName,
 *     sgTypecode,
 *     sggName,
 *     sidoName,
 *     wiwName,
 *     partyName,
 *     krName
 *   )
 * VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
 * RETURNING id
 * ```
 */
export const createCandidate = new PreparedQuery<ICreateCandidateParams,ICreateCandidateResult>(createCandidateIR);


