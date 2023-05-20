/* @name updateCommitments */
UPDATE commitment
SET prmsRealmName = new.prmsRealmName,
  prmsTitle = new.prmsTitle,
  prmmCont = new.prmmCont
FROM (
    SELECT unnest($1::int []) AS id,
      unnest($2::text []) AS prmsRealmName,
      unnest($3::text []) AS prmsTitle,
      unnest($4::text []) AS prmmCont
  ) AS new
WHERE commitment.id = new.id;