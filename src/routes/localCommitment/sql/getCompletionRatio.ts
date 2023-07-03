/** Types generated for queries found in "src/routes/localCommitment/sql/getCompletionRatio.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCompletionRatio' parameters type */
export type IGetCompletionRatioParams = void;

/** 'GetCompletionRatio' return type */
export interface IGetCompletionRatioResult {
  category: number;
  id: string;
  total: string | null;
}

/** 'GetCompletionRatio' query type */
export interface IGetCompletionRatioQuery {
  params: IGetCompletionRatioParams;
  result: IGetCompletionRatioResult;
}

const getCompletionRatioIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT commitment.id,\n  finance.category,\n  sum(gov_expenditure) + sum(sido_expenditure) + sum(sigungu_expenditure) + sum(etc_expenditure) AS total\nFROM commitment\n  JOIN finance ON finance.commitment_id = commitment.id\n  AND finance.basis_date = CASE\n    WHEN $1::timestamptz IS NULL THEN (\n      SELECT basis_date\n      FROM finance\n      ORDER BY basis_date DESC\n      LIMIT 1\n    )\n    ELSE $1\n  END\n  AND (\n    $2::int [] IS NULL\n    OR finance.fiscal_year = ANY($2)\n  )\n  AND (\n    $3::int [] IS NULL\n    OR commitment.sfrnd_code = ANY($3)\n  )\nGROUP BY commitment.id,\n  finance.category\nORDER BY commitment.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT commitment.id,
 *   finance.category,
 *   sum(gov_expenditure) + sum(sido_expenditure) + sum(sigungu_expenditure) + sum(etc_expenditure) AS total
 * FROM commitment
 *   JOIN finance ON finance.commitment_id = commitment.id
 *   AND finance.basis_date = CASE
 *     WHEN $1::timestamptz IS NULL THEN (
 *       SELECT basis_date
 *       FROM finance
 *       ORDER BY basis_date DESC
 *       LIMIT 1
 *     )
 *     ELSE $1
 *   END
 *   AND (
 *     $2::int [] IS NULL
 *     OR finance.fiscal_year = ANY($2)
 *   )
 *   AND (
 *     $3::int [] IS NULL
 *     OR commitment.sfrnd_code = ANY($3)
 *   )
 * GROUP BY commitment.id,
 *   finance.category
 * ORDER BY commitment.id
 * ```
 */
export const getCompletionRatio = new PreparedQuery<IGetCompletionRatioParams,IGetCompletionRatioResult>(getCompletionRatioIR);


