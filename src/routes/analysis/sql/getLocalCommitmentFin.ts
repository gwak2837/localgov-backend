/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetLocalCommitmentFin' is invalid, so its result is assigned type 'never' */
export type IGetLocalCommitmentFinResult = never;

/** Query 'GetLocalCommitmentFin' is invalid, so its parameters are assigned type 'never' */
export type IGetLocalCommitmentFinParams = never;

const getLocalCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  basis_date,\n  category,\n  fiscal_year,\n  gov_expenditure AS gov,\n  sido_expenditure AS sido,\n  sigungu_expenditure AS sigungu,\n  etc_expenditure AS etc\nFROM finance\nWHERE commitment_id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   basis_date,
 *   category,
 *   fiscal_year,
 *   gov_expenditure AS gov,
 *   sido_expenditure AS sido,
 *   sigungu_expenditure AS sigungu,
 *   etc_expenditure AS etc
 * FROM finance
 * WHERE commitment_id = $1
 * ```
 */
export const getLocalCommitmentFin = new PreparedQuery<IGetLocalCommitmentFinParams,IGetLocalCommitmentFinResult>(getLocalCommitmentFinIR);


