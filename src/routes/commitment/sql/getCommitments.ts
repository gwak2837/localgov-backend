/** Types generated for queries found in "src/routes/commitment/sql/getCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommitments' parameters type */
export type IGetCommitmentsParams = void;

/** 'GetCommitments' return type */
export interface IGetCommitmentsResult {
  basis_date: Date;
  district: number | null;
  election__category: number | null;
  field_code: number;
  finance__category: number;
  gov: string | null;
  id: string;
  priority: number | null;
  sector_code: number | null;
  title: string;
  total: string | null;
}

/** 'GetCommitments' query type */
export interface IGetCommitmentsQuery {
  params: IGetCommitmentsParams;
  result: IGetCommitmentsResult;
}

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT commitment.id,\n  commitment.title,\n  commitment.priority,\n  commitment.field_code,\n  commitment.sector_code,\n  election.category AS election__category,\n  election.district,\n  finance.basis_date,\n  finance.category AS finance__category,\n  sum(gov) AS gov,\n  sum(gov) + sum(sido) + sum(sigungu) + sum(etc) AS total\nFROM commitment\n  JOIN election ON election.id = commitment.election_id\n  AND election.category = $1\n  AND (\n    $2::int [] IS NULL\n    OR election.district = ANY($2)\n  )\n  JOIN finance ON finance.commitment_id = commitment.id\n  AND (\n    CASE\n      WHEN $3::timestamptz IS NULL THEN finance.basis_date = ANY(\n        SELECT DISTINCT finance.basis_date\n        FROM commitment\n          JOIN election ON election.id = commitment.election_id\n          AND election.district = ANY($2)\n          JOIN finance ON finance.commitment_id = commitment.id\n        ORDER BY finance.basis_date DESC\n        LIMIT 2\n      )\n      ELSE finance.basis_date = ANY(\n        ARRAY [$3, (\n              SELECT DISTINCT basis_date \n              FROM commitment\n                JOIN election ON election.id = commitment.election_id\n                AND election.district = ANY($2)\n                JOIN finance ON finance.commitment_id = commitment.id\n              WHERE basis_date < $3 \n              ORDER BY finance.basis_date DESC\n              LIMIT 1\n            )]\n      )\n    END\n  )\nGROUP BY commitment.id,\n  election.id,\n  finance.basis_date,\n  finance.category\nORDER BY commitment.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT commitment.id,
 *   commitment.title,
 *   commitment.priority,
 *   commitment.field_code,
 *   commitment.sector_code,
 *   election.category AS election__category,
 *   election.district,
 *   finance.basis_date,
 *   finance.category AS finance__category,
 *   sum(gov) AS gov,
 *   sum(gov) + sum(sido) + sum(sigungu) + sum(etc) AS total
 * FROM commitment
 *   JOIN election ON election.id = commitment.election_id
 *   AND election.category = $1
 *   AND (
 *     $2::int [] IS NULL
 *     OR election.district = ANY($2)
 *   )
 *   JOIN finance ON finance.commitment_id = commitment.id
 *   AND (
 *     CASE
 *       WHEN $3::timestamptz IS NULL THEN finance.basis_date = ANY(
 *         SELECT DISTINCT finance.basis_date
 *         FROM commitment
 *           JOIN election ON election.id = commitment.election_id
 *           AND election.district = ANY($2)
 *           JOIN finance ON finance.commitment_id = commitment.id
 *         ORDER BY finance.basis_date DESC
 *         LIMIT 2
 *       )
 *       ELSE finance.basis_date = ANY(
 *         ARRAY [$3, (
 *               SELECT DISTINCT basis_date 
 *               FROM commitment
 *                 JOIN election ON election.id = commitment.election_id
 *                 AND election.district = ANY($2)
 *                 JOIN finance ON finance.commitment_id = commitment.id
 *               WHERE basis_date < $3 
 *               ORDER BY finance.basis_date DESC
 *               LIMIT 1
 *             )]
 *       )
 *     END
 *   )
 * GROUP BY commitment.id,
 *   election.id,
 *   finance.basis_date,
 *   finance.category
 * ORDER BY commitment.id
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


