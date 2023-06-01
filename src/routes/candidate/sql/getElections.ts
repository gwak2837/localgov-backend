/** Types generated for queries found in "src/routes/candidate/sql/getElections.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetElections' parameters type */
export type IGetElectionsParams = void;

/** 'GetElections' return type */
export interface IGetElectionsResult {
  id: string;
  sggname: string;
  sgid: number;
  sgtypecode: number;
  sidoname: string;
  wiwname: string | null;
}

/** 'GetElections' query type */
export interface IGetElectionsQuery {
  params: IGetElectionsParams;
  result: IGetElectionsResult;
}

const getElectionsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  sgId,\n  sgTypecode,\n  sggName,\n  sidoName,\n  wiwName\nFROM candidate"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   sgId,
 *   sgTypecode,
 *   sggName,
 *   sidoName,
 *   wiwName
 * FROM candidate
 * ```
 */
export const getElections = new PreparedQuery<IGetElectionsParams,IGetElectionsResult>(getElectionsIR);


