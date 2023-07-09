/** Types generated for queries found in "src/routes/analysis/sql/getPromptFromLoEdu.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetPromptFromLoEdu' parameters type */
export type IGetPromptFromLoEduParams = void;

/** 'GetPromptFromLoEdu' return type */
export interface IGetPromptFromLoEduResult {
  field_code: number;
  sector_code: number | null;
  title: string;
  when_: Date;
  who_code: number;
}

/** 'GetPromptFromLoEdu' query type */
export interface IGetPromptFromLoEduQuery {
  params: IGetPromptFromLoEduParams;
  result: IGetPromptFromLoEduResult;
}

const getPromptFromLoEduIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sfrnd_code AS who_code,\n  edu_finance.basis_date AS when_,\n  field_code,\n  sector_code,\n  edu_commitment.title\nFROM edu_commitment\n  JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id\n  AND edu_commitment.id = $1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sfrnd_code AS who_code,
 *   edu_finance.basis_date AS when_,
 *   field_code,
 *   sector_code,
 *   edu_commitment.title
 * FROM edu_commitment
 *   JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
 *   AND edu_commitment.id = $1
 * ```
 */
export const getPromptFromLoEdu = new PreparedQuery<IGetPromptFromLoEduParams,IGetPromptFromLoEduResult>(getPromptFromLoEduIR);


