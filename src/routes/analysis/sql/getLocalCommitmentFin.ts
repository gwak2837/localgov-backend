/** Types generated for queries found in "src/routes/analysis/sql/getLocalCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetLocalCommitmentFin' parameters type */
export type IGetLocalCommitmentFinParams = void;

/** 'GetLocalCommitmentFin' return type */
export interface IGetLocalCommitmentFinResult {
  basis_date: Date | null;
  category: number;
  commitment_id: string | null;
  etc_expenditure: string | null;
  fiscal_year: number | null;
  gov_expenditure: string | null;
  id: string;
  sido_expenditure: string | null;
  sigungu_expenditure: string | null;
}

/** 'GetLocalCommitmentFin' query type */
export interface IGetLocalCommitmentFinQuery {
  params: IGetLocalCommitmentFinParams;
  result: IGetLocalCommitmentFinResult;
}

const getLocalCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM finance"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM finance
 * ```
 */
export const getLocalCommitmentFin = new PreparedQuery<IGetLocalCommitmentFinParams,IGetLocalCommitmentFinResult>(getLocalCommitmentFinIR);


