/** Types generated for queries found in "src/routes/commitment/sql/getBasisDates.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetBasisDate' parameters type */
export type IGetBasisDateParams = void;

/** 'GetBasisDate' return type */
export interface IGetBasisDateResult {
  basis_date: string | null;
}

/** 'GetBasisDate' query type */
export interface IGetBasisDateQuery {
  params: IGetBasisDateParams;
  result: IGetBasisDateResult;
}

const getBasisDateIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT finance.basis_date::text\nFROM finance\n  JOIN commitment ON commitment.id = finance.commitment_id\n  JOIN election ON election.id = commitment.election_id\n  AND election.category = $1\nORDER BY basis_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT finance.basis_date::text
 * FROM finance
 *   JOIN commitment ON commitment.id = finance.commitment_id
 *   JOIN election ON election.id = commitment.election_id
 *   AND election.category = $1
 * ORDER BY basis_date DESC
 * ```
 */
export const getBasisDate = new PreparedQuery<IGetBasisDateParams,IGetBasisDateResult>(getBasisDateIR);


