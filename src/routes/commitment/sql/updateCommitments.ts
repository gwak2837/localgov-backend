/** Types generated for queries found in "src/routes/commitment/sql/updateCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'UpdateCommitments' is invalid, so its result is assigned type 'never' */
export type IUpdateCommitmentsResult = never;

/** Query 'UpdateCommitments' is invalid, so its parameters are assigned type 'never' */
export type IUpdateCommitmentsParams = never;

const updateCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"UPDATE commitment\nSET prmsRealmName = new.prmsRealmName,\n  prmsTitle = new.prmsTitle,\n  prmmCont = new.prmmCont\nFROM (\n    SELECT unnest($1::int []) AS id,\n      unnest($2::text []) AS prmsRealmName,\n      unnest($3::text []) AS prmsTitle,\n      unnest($4::text []) AS prmmCont\n  ) AS new\nWHERE commitment.id = new.id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE commitment
 * SET prmsRealmName = new.prmsRealmName,
 *   prmsTitle = new.prmsTitle,
 *   prmmCont = new.prmmCont
 * FROM (
 *     SELECT unnest($1::int []) AS id,
 *       unnest($2::text []) AS prmsRealmName,
 *       unnest($3::text []) AS prmsTitle,
 *       unnest($4::text []) AS prmmCont
 *   ) AS new
 * WHERE commitment.id = new.id
 * ```
 */
export const updateCommitments = new PreparedQuery<IUpdateCommitmentsParams,IUpdateCommitmentsResult>(updateCommitmentsIR);


