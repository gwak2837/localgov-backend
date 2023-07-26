/** Types generated for queries found in "src/routes/localCommitment/sql/getLocalGovCodes.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetLocalGovCodes' is invalid, so its result is assigned type 'never' */
export type IGetLocalGovCodesResult = never;

/** Query 'GetLocalGovCodes' is invalid, so its parameters are assigned type 'never' */
export type IGetLocalGovCodesParams = never;

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


