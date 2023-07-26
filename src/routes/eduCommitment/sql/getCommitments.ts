/** Types generated for queries found in "src/routes/eduCommitment/sql/getCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetCommitments' is invalid, so its result is assigned type 'never' */
export type IGetCommitmentsResult = never;

/** Query 'GetCommitments' is invalid, so its parameters are assigned type 'never' */
export type IGetCommitmentsParams = never;

const getCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT id,\n  title,\n  sfrnd_code,\n  field_code,\n  sector_code,\n  priority,\n  basis_date,\n  category,\n  total,\n  CASE\n    WHEN total > 0 THEN round(100 * gov / total, 1)\n    ELSE NULL\n  END AS gov_ratio\nFROM (\n    SELECT edu_commitment.id,\n      edu_commitment.title,\n      sfrnd_code,\n      field_code,\n      sector_code,\n      priority,\n      edu_finance.basis_date,\n      edu_finance.category,\n      sum(gov) AS gov,\n      sum(itself) + sum(gov) + sum(sido) + sum(etc) AS total\n    FROM edu_commitment\n      LEFT JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id\n      AND (\n        $1::int [] IS NULL\n        OR edu_commitment.sfrnd_code = ANY($1)\n      )\n      AND (\n        CASE\n          WHEN $2::timestamptz IS NULL THEN edu_finance.basis_date = ANY(\n            SELECT DISTINCT basis_date\n            FROM edu_finance\n            ORDER BY basis_date DESC\n            LIMIT 2\n          )\n          ELSE edu_finance.basis_date = ANY(\n            ARRAY [$2, (SELECT DISTINCT basis_date FROM edu_finance WHERE basis_date < $2 ORDER BY basis_date DESC LIMIT 1)]\n          )\n        END\n      )\n    GROUP BY edu_commitment.id,\n      edu_finance.basis_date,\n      edu_finance.category\n    ORDER BY edu_commitment.id\n  ) AS temp"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id,
 *   title,
 *   sfrnd_code,
 *   field_code,
 *   sector_code,
 *   priority,
 *   basis_date,
 *   category,
 *   total,
 *   CASE
 *     WHEN total > 0 THEN round(100 * gov / total, 1)
 *     ELSE NULL
 *   END AS gov_ratio
 * FROM (
 *     SELECT edu_commitment.id,
 *       edu_commitment.title,
 *       sfrnd_code,
 *       field_code,
 *       sector_code,
 *       priority,
 *       edu_finance.basis_date,
 *       edu_finance.category,
 *       sum(gov) AS gov,
 *       sum(itself) + sum(gov) + sum(sido) + sum(etc) AS total
 *     FROM edu_commitment
 *       LEFT JOIN edu_finance ON edu_finance.commitment_id = edu_commitment.id
 *       AND (
 *         $1::int [] IS NULL
 *         OR edu_commitment.sfrnd_code = ANY($1)
 *       )
 *       AND (
 *         CASE
 *           WHEN $2::timestamptz IS NULL THEN edu_finance.basis_date = ANY(
 *             SELECT DISTINCT basis_date
 *             FROM edu_finance
 *             ORDER BY basis_date DESC
 *             LIMIT 2
 *           )
 *           ELSE edu_finance.basis_date = ANY(
 *             ARRAY [$2, (SELECT DISTINCT basis_date FROM edu_finance WHERE basis_date < $2 ORDER BY basis_date DESC LIMIT 1)]
 *           )
 *         END
 *       )
 *     GROUP BY edu_commitment.id,
 *       edu_finance.basis_date,
 *       edu_finance.category
 *     ORDER BY edu_commitment.id
 *   ) AS temp
 * ```
 */
export const getCommitments = new PreparedQuery<IGetCommitmentsParams,IGetCommitmentsResult>(getCommitmentsIR);


