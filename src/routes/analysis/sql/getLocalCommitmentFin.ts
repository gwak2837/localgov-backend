/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetLocalCommitmentFin' is invalid, so its result is assigned type 'never' */
export type IGetLocalCommitmentFinResult = never;

/** Query 'GetLocalCommitmentFin' is invalid, so its parameters are assigned type 'never' */
export type IGetLocalCommitmentFinParams = never;

const getLocalCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  category,\n  basis_date,\n  fiscal_year,\n  gov,\n  sido,\n  sigungu,\n  etc\nFROM finance\nWHERE commitment_id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   category,
 *   basis_date,
 *   fiscal_year,
 *   gov,
 *   sido,
 *   sigungu,
 *   etc
 * FROM finance
 * WHERE commitment_id = $1
 * ```
 */
export const getLocalCommitmentFin = new PreparedQuery<IGetLocalCommitmentFinParams,IGetLocalCommitmentFinResult>(getLocalCommitmentFinIR);


