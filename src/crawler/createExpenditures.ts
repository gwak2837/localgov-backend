/** Types generated for queries found in "src/crawler/createExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateExpenditures' parameters type */
export type ICreateExpendituresParams = void;

/** 'CreateExpenditures' return type */
export type ICreateExpendituresResult = void;

/** 'CreateExpenditures' query type */
export interface ICreateExpendituresQuery {
  params: ICreateExpendituresParams;
  result: ICreateExpendituresResult;
}

const createExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO local_expenditure (\n    sfrnd_code,\n    detail_bsns_nm,\n    excut_de,\n    budget_crntam,\n    nxndr,\n    cty,\n    signgunon,\n    etc_crntam,\n    expndtram,\n    orgnztnam,\n    realm_code,\n    sect_code\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::text [],\n    $3::timestamptz [],\n    $4::bigint [],\n    $5::bigint [],\n    $6::bigint [],\n    $7::bigint [],\n    $8::bigint [],\n    $9::bigint [],\n    $10::bigint [],\n    $11::int [],\n    $12::int []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO local_expenditure (
 *     sfrnd_code,
 *     detail_bsns_nm,
 *     excut_de,
 *     budget_crntam,
 *     nxndr,
 *     cty,
 *     signgunon,
 *     etc_crntam,
 *     expndtram,
 *     orgnztnam,
 *     realm_code,
 *     sect_code
 *   )
 * SELECT *
 * FROM unnest(
 *     $1::int [],
 *     $2::text [],
 *     $3::timestamptz [],
 *     $4::bigint [],
 *     $5::bigint [],
 *     $6::bigint [],
 *     $7::bigint [],
 *     $8::bigint [],
 *     $9::bigint [],
 *     $10::bigint [],
 *     $11::int [],
 *     $12::int []
 *   )
 * ```
 */
export const createExpenditures = new PreparedQuery<ICreateExpendituresParams,ICreateExpendituresResult>(createExpendituresIR);


