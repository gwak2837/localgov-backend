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

const updateCandidateIR: any = {"usedParamSet":{},"params":[],"statement":"UPDATE candidate\nSET sgId = $2,\n  sgName = $3,\n  sgTypecode = $4,\n  sggName = $5,\n  sidoName = $6,\n  wiwName = $7,\n  partyName = $8,\n  krName = $9\nWHERE id = $1"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE candidate
 * SET sgId = $2,
 *   sgName = $3,
 *   sgTypecode = $4,
 *   sggName = $5,
 *   sidoName = $6,
 *   wiwName = $7,
 *   partyName = $8,
 *   krName = $9
 * WHERE id = $1
 * ```
 */
export const updateCandidate = new PreparedQuery<IUpdateCandidateParams,IUpdateCandidateResult>(updateCandidateIR);


