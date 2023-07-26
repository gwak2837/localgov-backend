/** Types generated for queries found in "src/routes/eduCommitment/sql/getLocalCodes.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetLocalCodes' is invalid, so its result is assigned type 'never' */
export type IGetLocalCodesResult = never;

/** Query 'GetLocalCodes' is invalid, so its parameters are assigned type 'never' */
export type IGetLocalCodesParams = never;

const getLocalCodesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT sfrnd_code\nFROM edu_commitment\nORDER BY sfrnd_code"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT sfrnd_code
 * FROM edu_commitment
 * ORDER BY sfrnd_code
 * ```
 */
export const getLocalCodes = new PreparedQuery<IGetLocalCodesParams,IGetLocalCodesResult>(getLocalCodesIR);


