/* @name deleteCandidates */
DELETE FROM candidate
WHERE id = ANY($1);