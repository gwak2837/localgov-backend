/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromComm2.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type stringArray = (string)[];

/** 'GetPromptFromComm2' parameters type */
export type IGetPromptFromComm2Params = void;

/** 'GetPromptFromComm2' return type */
export interface IGetPromptFromComm2Result {
  category: number | null;
  content: string | null;
  field_code: number;
  primary_dept: stringArray | null;
  sector_code: number | null;
  title: string;
  when_date: Date;
  who_code: number | null;
}

/** 'GetPromptFromComm2' query type */
export interface IGetPromptFromComm2Query {
  params: IGetPromptFromComm2Params;
  result: IGetPromptFromComm2Result;
}

const getPromptFromComm2IR: any = {"usedParamSet":{},"params":[],"statement":"SELECT election.district AS who_code,\n  election.category,\n  primary_dept,\n  finance.basis_date AS when_date,\n  field_code,\n  sector_code,\n  commitment.title,\n  content\nFROM commitment\n  JOIN election ON election.id = commitment.election_id\n  LEFT JOIN finance ON finance.commitment_id = commitment.id\n  AND commitment.id = $1\nORDER BY finance.basis_date DESC\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT election.district AS who_code,
 *   election.category,
 *   primary_dept,
 *   finance.basis_date AS when_date,
 *   field_code,
 *   sector_code,
 *   commitment.title,
 *   content
 * FROM commitment
 *   JOIN election ON election.id = commitment.election_id
 *   LEFT JOIN finance ON finance.commitment_id = commitment.id
 *   AND commitment.id = $1
 * ORDER BY finance.basis_date DESC
 * LIMIT 1
 * ```
 */
export const getPromptFromComm2 = new PreparedQuery<IGetPromptFromComm2Params,IGetPromptFromComm2Result>(getPromptFromComm2IR);


