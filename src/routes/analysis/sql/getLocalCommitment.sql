/* @name getLocalCommitment */
SELECT sfrnd_code,
  title
FROM commitment
WHERE id = $1;