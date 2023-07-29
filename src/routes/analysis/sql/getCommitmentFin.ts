/** Types generated for queries found in "src/routes/analysis/sql/getCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommitmentFin' parameters type */
export type IGetCommitmentFinParams = void;

/** 'GetCommitmentFin' return type */
export interface IGetCommitmentFinResult {
  basis_date: Date;
  category: number;
  etc: string | null;
  fiscal_year: number | null;
  gov: string | null;
  id: string;
  sido: string | null;
  sigungu: string | null;
}

/** 'GetCommitmentFin' query type */
export interface IGetCommitmentFinQuery {
  params: IGetCommitmentFinParams;
  result: IGetCommitmentFinResult;
}

const getCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  basis_date,\n  category,\n  fiscal_year,\n  gov,\n  sido,\n  sigungu,\n  etc\nFROM finance\nWHERE commitment_id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   basis_date,
 *   category,
 *   fiscal_year,
 *   gov,
 *   sido,
 *   sigungu,
 *   etc
 * FROM finance
 * WHERE commitment_id = $1
 * ```
 */
export const getCommitmentFin = new PreparedQuery<IGetCommitmentFinParams,IGetCommitmentFinResult>(getCommitmentFinIR);


