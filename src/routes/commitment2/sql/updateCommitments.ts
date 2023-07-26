/** Types generated for queries found in "src/routes/commitment2/sql/updateCommitments.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'UpdateCommitments' parameters type */
export type IUpdateCommitmentsParams = void;

/** 'UpdateCommitments' return type */
export type IUpdateCommitmentsResult = void;

/** 'UpdateCommitments' query type */
export interface IUpdateCommitmentsQuery {
  params: IUpdateCommitmentsParams;
  result: IUpdateCommitmentsResult;
}

const updateCommitmentsIR: any = {"usedParamSet":{},"params":[],"statement":"UPDATE commitment2\nSET prmsRealmName = new.prmsRealmName,\n  prmsTitle = new.prmsTitle,\n  prmmCont = new.prmmCont\nFROM (\n    SELECT unnest($1::int []) AS id,\n      unnest($2::text []) AS prmsRealmName,\n      unnest($3::text []) AS prmsTitle,\n      unnest($4::text []) AS prmmCont\n  ) AS new\nWHERE commitment2.id = new.id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE commitment2
 * SET prmsRealmName = new.prmsRealmName,
 *   prmsTitle = new.prmsTitle,
 *   prmmCont = new.prmmCont
 * FROM (
 *     SELECT unnest($1::int []) AS id,
 *       unnest($2::text []) AS prmsRealmName,
 *       unnest($3::text []) AS prmsTitle,
 *       unnest($4::text []) AS prmmCont
 *   ) AS new
 * WHERE commitment2.id = new.id
 * ```
 */
export const updateCommitments = new PreparedQuery<IUpdateCommitmentsParams,IUpdateCommitmentsResult>(updateCommitmentsIR);


