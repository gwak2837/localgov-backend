/* @name createCommitment */
INSERT INTO commitment2 (prmsRealmName, prmsTitle, prmmCont, candidate_id)
VALUES($1, $2, $3, $4)
RETURNING id;