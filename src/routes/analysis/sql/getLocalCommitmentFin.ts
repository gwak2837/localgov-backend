/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalCommitmentFin' parameters type */
export type IGetLocalCommitmentFinParams = void;

/** 'GetLocalCommitmentFin' return type */
export interface IGetLocalCommitmentFinResult {
  basis_date: Date | null;
  category: number;
  etc: string | null;
  fiscal_year: number | null;
  gov: string | null;
  id: string;
  sido: string | null;
  sigungu: string | null;
}

/** 'GetLocalCommitmentFin' query type */
export interface IGetLocalCommitmentFinQuery {
  params: IGetLocalCommitmentFinParams;
  result: IGetLocalCommitmentFinResult;
}

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


