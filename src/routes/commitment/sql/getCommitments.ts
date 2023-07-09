/** Types generated for queries found in "src/routes/commitment/sql/getCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommitments' parameters type */
export type IGetCommitmentsParams = void;

/** 'GetCommitments' return type */
export interface IGetCommitmentsResult {
  candidate__id: string;
  candidate__krname: string;
  candidate__partyname: string | null;
  candidate__sggname: string;
  candidate__sgid: number;
  candidate__sgtypecode: number;
  candidate__sidoname: string;
  candidate__wiwname: string | null;
  candidate_id: string | null;
  id: string;
  prmmcont: string | null;
  prmsrealmname: string | null;
  prmstitle: string;
}

/** 'GetCommitments' query type */
export interface IGetCommitmentsQuery {
  params: IGetCommitmentsParams;
  result: IGetCommitmentsResult;
}

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT commitment2.id,\n  prmsRealmName,\n  prmsTitle,\n  prmmCont,\n  candidate_id,\n  candidate.id AS candidate__id,\n  sgId AS candidate__sgId,\n  sgTypecode AS candidate__sgTypecode,\n  sggName AS candidate__sggName,\n  sidoName AS candidate__sidoName,\n  wiwName AS candidate__wiwName,\n  partyName AS candidate__partyName,\n  krName AS candidate__krName\nFROM commitment2\n  JOIN candidate ON candidate.id = commitment2.candidate_id\n  AND candidate.id = ANY ($1)\nWHERE commitment2.id < $2\nORDER BY commitment2.id DESC\nLIMIT $3"};

/**
 * Query generated from SQL:
 * ```
 * SELECT commitment2.id,
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
 * FROM commitment2
 *   JOIN candidate ON candidate.id = commitment2.candidate_id
 *   AND candidate.id = ANY ($1)
 * WHERE commitment2.id < $2
 * ORDER BY commitment2.id DESC
 * LIMIT $3
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


