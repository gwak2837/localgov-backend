/* @name deleteCommitments */
DELETE FROM commitment2
WHERE id = ANY($1);