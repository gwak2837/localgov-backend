/** Types generated for queries found in "src/routes/analysis/sql/getRelatedCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetRelatedCommitments' parameters type */
export type IGetRelatedCommitmentsParams = void;

/** 'GetRelatedCommitments' return type */
export interface IGetRelatedCommitmentsResult {
  category: number | null;
  content: string | null;
  district: number | null;
  election_date: string | null;
  field_code: number | null;
  id: string | null;
  title: string | null;
}

/** 'GetRelatedCommitments' query type */
export interface IGetRelatedCommitmentsQuery {
  params: IGetRelatedCommitmentsParams;
  result: IGetRelatedCommitmentsResult;
}

const getRelatedCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM (\n    SELECT commitment.id,\n      title,\n      content,\n      field_code,\n      election.category,\n      election.election_date::text,\n      election.district\n    FROM commitment\n      JOIN election ON election.id = commitment.election_id\n      AND field_code = $1\n      AND commitment.id != $2\n    ORDER BY category DESC\n  ) AS temp\nUNION ALL\nSELECT commitment.id,\n  title,\n  content,\n  field_code,\n  election.category,\n  election.election_date::text,\n  election.district\nFROM commitment\n  JOIN election ON election.id = commitment.election_id\n  AND field_code != $1\nLIMIT 20"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM (
 *     SELECT commitment.id,
 *       title,
 *       content,
 *       field_code,
 *       election.category,
 *       election.election_date::text,
 *       election.district
 *     FROM commitment
 *       JOIN election ON election.id = commitment.election_id
 *       AND field_code = $1
 *       AND commitment.id != $2
 *     ORDER BY category DESC
 *   ) AS temp
 * UNION ALL
 * SELECT commitment.id,
 *   title,
 *   content,
 *   field_code,
 *   election.category,
 *   election.election_date::text,
 *   election.district
 * FROM commitment
 *   JOIN election ON election.id = commitment.election_id
 *   AND field_code != $1
 * LIMIT 20
 * ```
 */
export const getRelatedCommitments = new PreparedQuery<IGetRelatedCommitmentsParams,IGetRelatedCommitmentsResult>(getRelatedCommitmentsIR);


