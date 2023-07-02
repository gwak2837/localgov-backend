/** Types generated for queries found in "src/routes/commitment/sql/getCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetCommitments' is invalid, so its result is assigned type 'never' */
export type IGetCommitmentsResult = never;

/** Query 'GetCommitments' is invalid, so its parameters are assigned type 'never' */
export type IGetCommitmentsParams = never;

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT commitment.id,\n  prmsRealmName,\n  prmsTitle,\n  prmmCont,\n  candidate_id,\n  candidate.id AS candidate__id,\n  sgId AS candidate__sgId,\n  sgTypecode AS candidate__sgTypecode,\n  sggName AS candidate__sggName,\n  sidoName AS candidate__sidoName,\n  wiwName AS candidate__wiwName,\n  partyName AS candidate__partyName,\n  krName AS candidate__krName\nFROM commitment\n  JOIN candidate ON candidate.id = commitment.candidate_id\n  AND candidate.id = ANY ($1)\nWHERE commitment.id < $2\nORDER BY commitment.id DESC\nLIMIT $3"};

/**
 * Query generated from SQL:
 * ```
 * SELECT commitment.id,
 *   prmsRealmName,
 *   prmsTitle,
 *   prmmCont,
 *   candidate_id,
 *   candidate.id AS candidate__id,
 *   sgId AS candidate__sgId,
 *   sgTypecode AS candidate__sgTypecode,
 *   sggName AS candidate__sggName,
 *   sidoName AS candidate__sidoName,
 *   wiwName AS candidate__wiwName,
 *   partyName AS candidate__partyName,
 *   krName AS candidate__krName
 * FROM commitment
 *   JOIN candidate ON candidate.id = commitment.candidate_id
 *   AND candidate.id = ANY ($1)
 * WHERE commitment.id < $2
 * ORDER BY commitment.id DESC
 * LIMIT $3
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


