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

const createExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO expenditure (\n    sfrnd_code,\n    accnut_se_code,\n    dept_code,\n    detail_bsns_code,\n    excut_de,\n    budget_crntam,\n    nxndr,\n    cty,\n    signgunon,\n    etc_crntam,\n    expndtram,\n    orgnztnam,\n    realm_code,\n    sect_code,\n    administ_sfrnd_code\n  )\nSELECT *\nFROM unnest(\n    $1::int [],\n    $2::text [],\n    $3::int [],\n    $4::text [],\n    $5::timestamptz [],\n    $6::bigint [],\n    $7::bigint [],\n    $8::bigint [],\n    $9::bigint [],\n    $10::bigint [],\n    $11::bigint [],\n    $12::bigint [],\n    $13::text [],\n    $14::text [],\n    $15::int []\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO expenditure (
 *     sfrnd_code,
 *     accnut_se_code,
 *     dept_code,
 *     detail_bsns_code,
 *     excut_de,
 *     budget_crntam,
 *     nxndr,
 *     cty,
 *     signgunon,
 *     etc_crntam,
 *     expndtram,
 *     orgnztnam,
 *     realm_code,
 *     sect_code,
 *     administ_sfrnd_code
 *   )
 * SELECT *
 * FROM unnest(
 *     $1::int [],
 *     $2::text [],
 *     $3::int [],
 *     $4::text [],
 *     $5::timestamptz [],
 *     $6::bigint [],
 *     $7::bigint [],
 *     $8::bigint [],
 *     $9::bigint [],
 *     $10::bigint [],
 *     $11::bigint [],
 *     $12::bigint [],
 *     $13::text [],
 *     $14::text [],
 *     $15::int []
 *   )
 * ```
 */
export const createExpenditures = new PreparedQuery<ICreateExpendituresParams,ICreateExpendituresResult>(createExpendituresIR);


