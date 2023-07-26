/** Types generated for queries found in "src/routes/commitment/sql/getLocalGovCodes.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalGovCodes' parameters type */
export type IGetLocalGovCodesParams = void;

/** 'GetLocalGovCodes' return type */
export interface IGetLocalGovCodesResult {
  district: number | null;
}

/** 'GetLocalGovCodes' query type */
export interface IGetLocalGovCodesQuery {
  params: IGetLocalGovCodesParams;
  result: IGetLocalGovCodesResult;
}

const getLocalGovCodesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT district\nFROM election\nWHERE category = $1\nORDER BY district"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT district
 * FROM election
 * WHERE category = $1
 * ORDER BY district
 * ```
 */
export const getLocalGovCodes = new PreparedQuery<IGetLocalGovCodesParams,IGetLocalGovCodesResult>(getLocalGovCodesIR);


