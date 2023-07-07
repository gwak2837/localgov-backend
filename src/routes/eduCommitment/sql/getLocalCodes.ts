/** Types generated for queries found in "src/routes/eduCommitment/sql/getLocalCodes.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalCodes' parameters type */
export type IGetLocalCodesParams = void;

/** 'GetLocalCodes' return type */
export interface IGetLocalCodesResult {
  sfrnd_code: number;
}

/** 'GetLocalCodes' query type */
export interface IGetLocalCodesQuery {
  params: IGetLocalCodesParams;
  result: IGetLocalCodesResult;
}

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


