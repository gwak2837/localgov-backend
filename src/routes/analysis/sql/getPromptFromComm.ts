/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromComm.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type stringArray = (string)[];

/** 'GetPromptFromComm' parameters type */
export type IGetPromptFromCommParams = void;

/** 'GetPromptFromComm' return type */
export interface IGetPromptFromCommResult {
  content: string | null;
  field_code: number;
  primary_dept: stringArray | null;
  sector_code: number | null;
  title: string;
  when_: Date;
  who_code: number | null;
}

/** 'GetPromptFromComm' query type */
export interface IGetPromptFromCommQuery {
  params: IGetPromptFromCommParams;
  result: IGetPromptFromCommResult;
}

const getPromptFromCommIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT election.district AS who_code,\n  primary_dept,\n  finance.basis_date AS when_,\n  field_code,\n  sector_code,\n  commitment.title,\n  content\nFROM commitment\n  JOIN election ON election.id = commitment.election_id\n  AND commitment.id = $1\n  JOIN finance ON finance.commitment_id = commitment.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT election.district AS who_code,
 *   primary_dept,
 *   finance.basis_date AS when_,
 *   field_code,
 *   sector_code,
 *   commitment.title,
 *   content
 * FROM commitment
 *   JOIN election ON election.id = commitment.election_id
 *   AND commitment.id = $1
 *   JOIN finance ON finance.commitment_id = commitment.id
 * ```
 */
export const getPromptFromComm = new PreparedQuery<IGetPromptFromCommParams,IGetPromptFromCommResult>(getPromptFromCommIR);


