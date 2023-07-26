/** Types generated for queries found in "src/routes/localCommitment/sql/getCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCommitments' parameters type */
export type IGetCommitmentsParams = void;

/** 'GetCommitments' return type */
export interface IGetCommitmentsResult {
  basis_date: Date | null;
  category: number;
  field_code: number;
  gov_ratio: string | null;
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

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  title,\n  priority,\n  field_code,\n  sector_code,\n  basis_date,\n  category,\n  total,\n  CASE\n    WHEN total > 0 THEN round(100 * gov_expenditure / total, 1)\n    ELSE NULL\n  END AS gov_ratio\nFROM (\n    SELECT commitment.id,\n      commitment.title,\n      priority,\n      field_code,\n      sector_code,\n      finance.basis_date,\n      finance.category,\n      sum(gov_expenditure) AS gov_expenditure,\n      sum(gov_expenditure) + sum(sido_expenditure) + sum(sigungu_expenditure) + sum(etc_expenditure) AS total\n    FROM commitment\n      LEFT JOIN finance ON finance.commitment_id = commitment.id\n      AND (\n        CASE\n          WHEN $1::timestamptz IS NULL THEN finance.basis_date = ANY(\n            SELECT DISTINCT finance.basis_date\n            FROM commitment\n              JOIN finance ON finance.commitment_id = commitment.id\n              AND commitment.sfrnd_code = any($2)\n            ORDER BY finance.basis_date DESC\n            LIMIT 2\n          )\n          ELSE finance.basis_date = ANY(\n            ARRAY [$1, (\n              select distinct basis_date \n              FROM commitment\n                JOIN finance ON finance.commitment_id = commitment.id\n                AND commitment.sfrnd_code = any($2) \n              WHERE basis_date < $1 \n              order by basis_date desc \n              limit 1\n            )]\n          )\n        END\n      )\n      AND (\n        $2::int [] IS NULL\n        OR commitment.sfrnd_code = ANY($2)\n      )\n    GROUP BY commitment.id,\n      finance.basis_date,\n      finance.category\n    ORDER BY commitment.id\n  ) AS temp"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   title,
 *   priority,
 *   field_code,
 *   sector_code,
 *   basis_date,
 *   category,
 *   total,
 *   CASE
 *     WHEN total > 0 THEN round(100 * gov_expenditure / total, 1)
 *     ELSE NULL
 *   END AS gov_ratio
 * FROM (
 *     SELECT commitment.id,
 *       commitment.title,
 *       priority,
 *       field_code,
 *       sector_code,
 *       finance.basis_date,
 *       finance.category,
 *       sum(gov_expenditure) AS gov_expenditure,
 *       sum(gov_expenditure) + sum(sido_expenditure) + sum(sigungu_expenditure) + sum(etc_expenditure) AS total
 *     FROM commitment
 *       LEFT JOIN finance ON finance.commitment_id = commitment.id
 *       AND (
 *         CASE
 *           WHEN $1::timestamptz IS NULL THEN finance.basis_date = ANY(
 *             SELECT DISTINCT finance.basis_date
 *             FROM commitment
 *               JOIN finance ON finance.commitment_id = commitment.id
 *               AND commitment.sfrnd_code = any($2)
 *             ORDER BY finance.basis_date DESC
 *             LIMIT 2
 *           )
 *           ELSE finance.basis_date = ANY(
 *             ARRAY [$1, (
 *               select distinct basis_date 
 *               FROM commitment
 *                 JOIN finance ON finance.commitment_id = commitment.id
 *                 AND commitment.sfrnd_code = any($2) 
 *               WHERE basis_date < $1 
 *               order by basis_date desc 
 *               limit 1
 *             )]
 *           )
 *         END
 *       )
 *       AND (
 *         $2::int [] IS NULL
 *         OR commitment.sfrnd_code = ANY($2)
 *       )
 *     GROUP BY commitment.id,
 *       finance.basis_date,
 *       finance.category
 *     ORDER BY commitment.id
 *   ) AS temp
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


