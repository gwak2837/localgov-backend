/** Types generated for queries found in "src/routes/candidate/sql/createCandidate.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateCandidate' parameters type */
export type ICreateCandidateParams = void;

/** 'CreateCandidate' return type */
export interface ICreateCandidateResult {
  id: string;
}

/** 'CreateCandidate' query type */
export interface ICreateCandidateQuery {
  params: ICreateCandidateParams;
  result: ICreateCandidateResult;
}

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


