/** Types generated for queries found in "src/routes/commitment/sql/getBasisDates.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetBasisDate' parameters type */
export type IGetBasisDateParams = void;

/** 'GetBasisDate' return type */
export interface IGetBasisDateResult {
  basis_date: Date;
}

/** 'GetBasisDate' query type */
export interface IGetBasisDateQuery {
  params: IGetBasisDateParams;
  result: IGetBasisDateResult;
}

const getBasisDateIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT DISTINCT basis_date\nFROM finance\nORDER BY basis_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT basis_date
 * FROM finance
 * ORDER BY basis_date DESC
 * ```
 */
export const getBasisDate = new PreparedQuery<IGetBasisDateParams,IGetBasisDateResult>(getBasisDateIR);


