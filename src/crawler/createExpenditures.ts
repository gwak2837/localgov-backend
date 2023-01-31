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

const createExpendituresIR: any = {"usedParamSet":{},"params":[],"statement":"INSERT INTO expenditure (\n    accnut_year,\n    wdr_sfrnd_code,\n    wdr_sfrnd_code_nm,\n    sfrnd_code,\n    sfrnd_nm_korean,\n    accnut_se_code,\n    accnut_se_nm,\n    dept_code,\n    detail_bsns_code,\n    detail_bsns_nm,\n    excut_de,\n    budget_crntam,\n    nxndr,\n    cty,\n    signgunon,\n    etc_crntam,\n    expndtram,\n    orgnztnam,\n    realm_code,\n    realm_nm,\n    sect_code,\n    sect_nm,\n    administ_sfrnd_code\n  )\nSELECT *\nFROM unnest(\n    ARRAY [$1::int[]],\n    ARRAY [$2::text[]],\n    ARRAY [$3::text[]],\n    ARRAY [$4::text[]],\n    ARRAY [$5::text[]],\n    ARRAY [$6::text[]],\n    ARRAY [$7::text[]],\n    ARRAY [$8::text[]],\n    ARRAY [$9::text[]],\n    ARRAY [$10::text[]],\n    ARRAY [$11::timestamptz[]],\n    ARRAY [$12::bigint[]],\n    ARRAY [$13::bigint[]],\n    ARRAY [$14::bigint[]],\n    ARRAY [$15::bigint[]],\n    ARRAY [$16::bigint[]],\n    ARRAY [$17::bigint[]],\n    ARRAY [$18::bigint[]],\n    ARRAY [$19::text[]],\n    ARRAY [$20::text[]],\n    ARRAY [$21::text[]],\n    ARRAY [$22::text[]],\n    ARRAY [$23::text[]]\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO expenditure (
 *     accnut_year,
 *     wdr_sfrnd_code,
 *     wdr_sfrnd_code_nm,
 *     sfrnd_code,
 *     sfrnd_nm_korean,
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
 *     realm_nm,
 *     sect_code,
 *     sect_nm,
 *     administ_sfrnd_code
 *   )
 * SELECT *
 * FROM unnest(
 *     ARRAY [$1::int[]],
 *     ARRAY [$2::text[]],
 *     ARRAY [$3::text[]],
 *     ARRAY [$4::text[]],
 *     ARRAY [$5::text[]],
 *     ARRAY [$6::text[]],
 *     ARRAY [$7::text[]],
 *     ARRAY [$8::text[]],
 *     ARRAY [$9::text[]],
 *     ARRAY [$10::text[]],
 *     ARRAY [$11::timestamptz[]],
 *     ARRAY [$12::bigint[]],
 *     ARRAY [$13::bigint[]],
 *     ARRAY [$14::bigint[]],
 *     ARRAY [$15::bigint[]],
 *     ARRAY [$16::bigint[]],
 *     ARRAY [$17::bigint[]],
 *     ARRAY [$18::bigint[]],
 *     ARRAY [$19::text[]],
 *     ARRAY [$20::text[]],
 *     ARRAY [$21::text[]],
 *     ARRAY [$22::text[]],
 *     ARRAY [$23::text[]]
 *   )
 * ```
 */
export const createExpenditures = new PreparedQuery<ICreateExpendituresParams,ICreateExpendituresResult>(createExpendituresIR);


