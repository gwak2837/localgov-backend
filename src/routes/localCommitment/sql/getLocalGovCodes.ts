/** Types generated for queries found in "src/routes/localCommitment/sql/getLocalGovCodes.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalGovCodes' parameters type */
export type IGetLocalGovCodesParams = void;

/** 'GetLocalGovCodes' return type */
export interface IGetLocalGovCodesResult {
  sfrnd_code: number;
}

/** 'GetLocalGovCodes' query type */
export interface IGetLocalGovCodesQuery {
  params: IGetLocalGovCodesParams;
  result: IGetLocalGovCodesResult;
}

const getLocalGovCodesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT sfrnd_code\nFROM commitment\nORDER BY sfrnd_code"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT sfrnd_code
 * FROM commitment
 * ORDER BY sfrnd_code
 * ```
 */
export const getLocalGovCodes = new PreparedQuery<IGetLocalGovCodesParams,IGetLocalGovCodesResult>(getLocalGovCodesIR);


