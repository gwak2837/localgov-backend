/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetEduCommitmentFin' is invalid, so its result is assigned type 'never' */
export type IGetEduCommitmentFinResult = never;

/** Query 'GetEduCommitmentFin' is invalid, so its parameters are assigned type 'never' */
export type IGetEduCommitmentFinParams = never;

const getEduCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  title,\n  basis_date,\n  category,\n  fiscal_year,\n  gov,\n  itself AS sigungu,\n  sido,\n  etc\nFROM edu_finance\nWHERE commitment_id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   title,
 *   basis_date,
 *   category,
 *   fiscal_year,
 *   gov,
 *   itself AS sigungu,
 *   sido,
 *   etc
 * FROM edu_finance
 * WHERE commitment_id = $1
 * ```
 */
export const getEduCommitmentFin = new PreparedQuery<IGetEduCommitmentFinParams,IGetEduCommitmentFinResult>(getEduCommitmentFinIR);


