/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetEduCommitmentFin' parameters type */
export type IGetEduCommitmentFinParams = void;

/** 'GetEduCommitmentFin' return type */
export interface IGetEduCommitmentFinResult {
  basis_date: Date;
  category: number;
  commitment_id: string | null;
  etc: string | null;
  fiscal_year: number | null;
  gov: string | null;
  id: string;
  itself: string | null;
  sido: string | null;
  title: string | null;
}

/** 'GetEduCommitmentFin' query type */
export interface IGetEduCommitmentFinQuery {
  params: IGetEduCommitmentFinParams;
  result: IGetEduCommitmentFinResult;
}

const getEduCommitmentFinIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM edu_finance"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM edu_finance
 * ```
 */
export const getEduCommitmentFin = new PreparedQuery<IGetEduCommitmentFinParams,IGetEduCommitmentFinResult>(getEduCommitmentFinIR);


