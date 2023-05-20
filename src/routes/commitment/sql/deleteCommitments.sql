/* @name deleteCommitments */
DELETE FROM commitment
WHERE id = ANY($1);