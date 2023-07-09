/* @name getEduCommitment */
SELECT sfrnd_code,
  title
FROM edu_commitment
WHERE id = $1;