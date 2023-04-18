/** Types generated for queries found in "src/crawler/createExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'CreateExpenditures' is invalid, so its result is assigned type 'never' */
export type ICreateExpendituresResult = never;

/** Query 'CreateExpenditures' is invalid, so its parameters are assigned type 'never' */
export type ICreateExpendituresParams = never;

const createExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO expenditure (\n    sfrnd_code,\n    detail_bsns_code,\n    detail_bsns_nm,\n    excut_de,\n    budget_crntam,\n    nxndr,\n    cty,\n    signgunon,\n    etc_crntam,\n    expndtram,\n    orgnztnam,\n    realm_code,\n    sect_code\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::text [],\n    $3::text [],\n    $4::timestamptz [],\n    $5::bigint [],\n    $6::bigint [],\n    $7::bigint [],\n    $8::bigint [],\n    $9::bigint [],\n    $10::bigint [],\n    $11::bigint [],\n    $12::int [],\n    $13::int []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO expenditure (
 *     sfrnd_code,
 *     detail_bsns_code,
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
 *     $3::text [],
 *     $4::timestamptz [],
 *     $5::bigint [],
 *     $6::bigint [],
 *     $7::bigint [],
 *     $8::bigint [],
 *     $9::bigint [],
 *     $10::bigint [],
 *     $11::bigint [],
 *     $12::int [],
 *     $13::int []
 *   )
 * ```
 */
export const createExpenditures = new PreparedQuery<ICreateExpendituresParams,ICreateExpendituresResult>(createExpendituresIR);


