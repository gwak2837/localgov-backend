/* @name deleteExpenditures */
DELETE FROM expenditure
WHERE excut_de = $1
  AND sfrnd_code >= $2
  AND sfrnd_code < $2 + 100000;