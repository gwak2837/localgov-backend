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
  candidate__sgname: string;
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

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT commitment.id,\n  prmsRealmName,\n  prmsTitle,\n  prmmCont,\n  candidate_id,\n  candidate.id AS candidate__id,\n  sgId AS candidate__sgId,\n  sgName AS candidate__sgName,\n  sgTypecode AS candidate__sgTypecode,\n  sggName AS candidate__sggName,\n  sidoName AS candidate__sidoName,\n  wiwName AS candidate__wiwName,\n  partyName AS candidate__partyName,\n  krName AS candidate__krName\nFROM commitment\n  JOIN candidate ON candidate.id = commitment.candidate_id\nWHERE commitment.id < $1\n  AND (\n    $2::int IS NULL\n    OR sgId BETWEEN $2 AND $3\n  )\n  AND (\n    $4::text IS NULL\n    OR sidoName = $4\n  )\n  AND (\n    $5::text IS NULL\n    OR sggName = $5\n  )\n  AND (\n    $6::int IS NULL\n    OR sgTypecode = $6\n  )\n  AND (\n    $7::text IS NULL\n    OR krName = $7\n  )\nORDER BY commitment.id DESC\nLIMIT $8"};

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
 *   sgName AS candidate__sgName,
 *   sgTypecode AS candidate__sgTypecode,
 *   sggName AS candidate__sggName,
 *   sidoName AS candidate__sidoName,
 *   wiwName AS candidate__wiwName,
 *   partyName AS candidate__partyName,
 *   krName AS candidate__krName
 * FROM commitment
 *   JOIN candidate ON candidate.id = commitment.candidate_id
 * WHERE commitment.id < $1
 *   AND (
 *     $2::int IS NULL
 *     OR sgId BETWEEN $2 AND $3
 *   )
 *   AND (
 *     $4::text IS NULL
 *     OR sidoName = $4
 *   )
 *   AND (
 *     $5::text IS NULL
 *     OR sggName = $5
 *   )
 *   AND (
 *     $6::int IS NULL
 *     OR sgTypecode = $6
 *   )
 *   AND (
 *     $7::text IS NULL
 *     OR krName = $7
 *   )
 * ORDER BY commitment.id DESC
 * LIMIT $8
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


