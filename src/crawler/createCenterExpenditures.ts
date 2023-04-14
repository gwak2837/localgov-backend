/** Types generated for queries found in "src/crawler/createCenterExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateCenterExpenditures' parameters type */
export type ICreateCenterExpendituresParams = void;

/** 'CreateCenterExpenditures' return type */
export type ICreateCenterExpendituresResult = void;

/** 'CreateCenterExpenditures' query type */
export interface ICreateCenterExpendituresQuery {
  params: ICreateCenterExpendituresParams;
  result: ICreateCenterExpendituresResult;
}

const createCenterExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO center_expenditure (\n    FSCL_YY,\n    OFFC_NM,\n    FLD_NM,\n    SECT_NM,\n    PGM_NM,\n    ACTV_NM,\n    SACTV_NM,\n    BZ_CLS_NM,\n    Y_YY_DFN_MEDI_KCUR_AMT\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::text [],\n    $3::text [],\n    $4::text [],\n    $5::text [],\n    $6::text [],\n    $7::text [],\n    $8::text [],\n    $9::bigint []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO center_expenditure (
 *     FSCL_YY,
 *     OFFC_NM,
 *     FLD_NM,
 *     SECT_NM,
 *     PGM_NM,
 *     ACTV_NM,
 *     SACTV_NM,
 *     BZ_CLS_NM,
 *     Y_YY_DFN_MEDI_KCUR_AMT
 *   )
 * SELECT *
 * FROM unnest(
 *     $1::int [],
 *     $2::text [],
 *     $3::text [],
 *     $4::text [],
 *     $5::text [],
 *     $6::text [],
 *     $7::text [],
 *     $8::text [],
 *     $9::bigint []
 *   )
 * ```
 */
export const createCenterExpenditures = new PreparedQuery<ICreateCenterExpendituresParams,ICreateCenterExpendituresResult>(createCenterExpendituresIR);


