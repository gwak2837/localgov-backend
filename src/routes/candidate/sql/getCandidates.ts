/** Types generated for queries found in "src/routes/candidate/sql/getCandidates.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCandidates' parameters type */
export type IGetCandidatesParams = void;

/** 'GetCandidates' return type */
export interface IGetCandidatesResult {
  id: string;
  krname: string;
  partyname: string | null;
  sggname: string;
  sgid: number;
  sgtypecode: number;
  sidoname: string;
  wiwname: string | null;
}

/** 'GetCandidates' query type */
export interface IGetCandidatesQuery {
  params: IGetCandidatesParams;
  result: IGetCandidatesResult;
}

const getCandidatesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  sgId,\n  sgTypecode,\n  sggName,\n  sidoName,\n  wiwName,\n  partyName,\n  krName\nFROM candidate\nORDER BY id DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   sgId,
 *   sgTypecode,
 *   sggName,
 *   sidoName,
 *   wiwName,
 *   partyName,
 *   krName
 * FROM candidate
 * ORDER BY id DESC
 * ```
 */
export const getCandidates = new PreparedQuery<IGetCandidatesParams,IGetCandidatesResult>(getCandidatesIR);


