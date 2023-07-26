/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalCommitmentFin' parameters type */
export type IGetLocalCommitmentFinParams = void;

/** 'GetLocalCommitmentFin' return type */
export interface IGetLocalCommitmentFinResult {
  basis_date: Date;
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

const getLocalCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  basis_date,\n  category,\n  fiscal_year,\n  gov,\n  sido,\n  sigungu,\n  etc\nFROM finance\nWHERE commitment_id = $1"};

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
export const getLocalCommitmentFin = new PreparedQuery<IGetLocalCommitmentFinParams,IGetLocalCommitmentFinResult>(getLocalCommitmentFinIR);


