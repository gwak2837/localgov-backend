/** Types generated for queries found in "src/routes/analysis/sql/getEduCommitmentFin.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetEduCommitmentFin' parameters type */
export type IGetEduCommitmentFinParams = void;

/** 'GetEduCommitmentFin' return type */
export interface IGetEduCommitmentFinResult {
  basis_date: Date;
  category: number;
  etc: string | null;
  fiscal_year: number | null;
  gov: string | null;
  id: string;
  sido: string | null;
  sigungu: string | null;
  title: string | null;
}

/** 'GetEduCommitmentFin' query type */
export interface IGetEduCommitmentFinQuery {
  params: IGetEduCommitmentFinParams;
  result: IGetEduCommitmentFinResult;
}

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


