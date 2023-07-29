/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromLoCom.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetPromptFromLoCom' parameters type */
export type IGetPromptFromLoComParams = void;

/** 'GetPromptFromLoCom' return type */
export interface IGetPromptFromLoComResult {
  field_code: number;
  sector_code: number | null;
  title: string;
  when_: Date;
  who_code: number | null;
}

/** 'GetPromptFromLoCom' query type */
export interface IGetPromptFromLoComQuery {
  params: IGetPromptFromLoComParams;
  result: IGetPromptFromLoComResult;
}

const getPromptFromLoComIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT election.district AS who_code,\n  finance.basis_date AS when_,\n  field_code,\n  sector_code,\n  commitment.title\nFROM commitment\n  JOIN election ON election.id = commitment.election_id\n  JOIN finance ON finance.commitment_id = commitment.id\n  AND commitment.id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT election.district AS who_code,
 *   finance.basis_date AS when_,
 *   field_code,
 *   sector_code,
 *   commitment.title
 * FROM commitment
 *   JOIN election ON election.id = commitment.election_id
 *   JOIN finance ON finance.commitment_id = commitment.id
 *   AND commitment.id = $1
 * ```
 */
export const getPromptFromLoCom = new PreparedQuery<IGetPromptFromLoComParams,IGetPromptFromLoComResult>(getPromptFromLoComIR);


