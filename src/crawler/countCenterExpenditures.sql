/* @name countCenterExpenditures */
SELECT COUNT(id)
FROM center_expenditure
WHERE FSCL_YY = $1;