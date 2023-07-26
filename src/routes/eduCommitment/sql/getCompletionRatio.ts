/** Types generated for queries found in "src/routes/eduCommitment/sql/getCompletionRatio.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetCompletionRatio' is invalid, so its result is assigned type 'never' */
export type IGetCompletionRatioResult = never;

/** Query 'GetCompletionRatio' is invalid, so its parameters are assigned type 'never' */
export type IGetCompletionRatioParams = never;

const getCompletionRatioIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT edu_commitment.id,\n  edu_finance.category,\n  sum(itself) + sum(gov) + sum(sido) + sum(etc) AS total\nFROM edu_commitment\n  JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id\n  AND (\n    $1::int [] IS NULL\n    OR edu_commitment.sfrnd_code = ANY($1)\n  )\n  AND edu_finance.basis_date = CASE\n    WHEN $2::timestamptz IS NULL THEN (\n      SELECT basis_date\n      FROM edu_finance\n      ORDER BY basis_date DESC\n      LIMIT 1\n    )\n    ELSE $2\n  END\n  AND (\n    $3::int [] IS NULL\n    OR edu_finance.fiscal_year = ANY($3)\n  )\nGROUP BY edu_commitment.id,\n  edu_finance.category\nORDER BY edu_commitment.id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT edu_commitment.id,
 *   edu_finance.category,
 *   sum(itself) + sum(gov) + sum(sido) + sum(etc) AS total
 * FROM edu_commitment
 *   JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
 *   AND (
 *     $1::int [] IS NULL
 *     OR edu_commitment.sfrnd_code = ANY($1)
 *   )
 *   AND edu_finance.basis_date = CASE
 *     WHEN $2::timestamptz IS NULL THEN (
 *       SELECT basis_date
 *       FROM edu_finance
 *       ORDER BY basis_date DESC
 *       LIMIT 1
 *     )
 *     ELSE $2
 *   END
 *   AND (
 *     $3::int [] IS NULL
 *     OR edu_finance.fiscal_year = ANY($3)
 *   )
 * GROUP BY edu_commitment.id,
 *   edu_finance.category
 * ORDER BY edu_commitment.id
 * ```
 */
export const getCompletionRatio = new PreparedQuery<IGetCompletionRatioParams,IGetCompletionRatioResult>(getCompletionRatioIR);


