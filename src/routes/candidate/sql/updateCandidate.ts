/** Types generated for queries found in "src/routes/candidate/sql/updateCandidate.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'UpdateCandidate' parameters type */
export type IUpdateCandidateParams = void;

/** 'UpdateCandidate' return type */
export type IUpdateCandidateResult = void;

/** 'UpdateCandidate' query type */
export interface IUpdateCandidateQuery {
  params: IUpdateCandidateParams;
  result: IUpdateCandidateResult;
}

const updateCandidateIR: any = {"usedParamSet":{},"params":[],"statement":"UPDATE candidate\nSET sgId = $2,\n  sgTypecode = $3,\n  sggName = $4,\n  sidoName = $5,\n  wiwName = $6,\n  partyName = $7,\n  krName = $8\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE candidate
 * SET sgId = $2,
 *   sgTypecode = $3,
 *   sggName = $4,
 *   sidoName = $5,
 *   wiwName = $6,
 *   partyName = $7,
 *   krName = $8
 * WHERE id = $1
 * ```
 */
export const updateCandidate = new PreparedQuery<IUpdateCandidateParams,IUpdateCandidateResult>(updateCandidateIR);


