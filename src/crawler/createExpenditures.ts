/** Types generated for queries found in "src/crawler/createExpenditures.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'CreateExpenditures' is invalid, so its result is assigned type 'never' */
export type ICreateExpendituresResult = never;

/** Query 'CreateExpenditures' is invalid, so its parameters are assigned type 'never' */
export type ICreateExpendituresParams = never;

const createExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO expenditure (\n    sfrnd_code,\n    accnut_se_code,\n    accnut_se_nm,\n    dept_code,\n    detail_bsns_code,\n    detail_bsns_nm,\n    excut_de,\n    budget_crntam,\n    nxndr,\n    cty,\n    signgunon,\n    etc_crntam,\n    expndtram,\n    orgnztnam,\n    realm_code,\n    sect_code\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::int [],\n    $3::text [],\n    $4::int [],\n    $5::text [],\n    $6::text [],\n    $7::timestamptz [],\n    $8::bigint [],\n    $9::bigint [],\n    $10::bigint [],\n    $11::bigint [],\n    $12::bigint [],\n    $13::bigint [],\n    $14::bigint [],\n    $15::int [],\n    $16::int []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO expenditure (
 *     sfrnd_code,
 *     accnut_se_code,
 *     accnut_se_nm,
 *     dept_code,
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
 *     $2::int [],
 *     $3::text [],
 *     $4::int [],
 *     $5::text [],
 *     $6::text [],
 *     $7::timestamptz [],
 *     $8::bigint [],
 *     $9::bigint [],
 *     $10::bigint [],
 *     $11::bigint [],
 *     $12::bigint [],
 *     $13::bigint [],
 *     $14::bigint [],
 *     $15::int [],
 *     $16::int []
 *   )
 * ```
 */
export const createExpenditures = new PreparedQuery<ICreateExpendituresParams,ICreateExpendituresResult>(createExpendituresIR);


