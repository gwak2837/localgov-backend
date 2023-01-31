/* @name countExpenditures */
SELECT COUNT(id)
FROM expenditure
WHERE wdr_sfrnd_code = $1
  AND excut_de = $2;