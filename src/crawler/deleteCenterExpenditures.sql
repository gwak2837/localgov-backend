/* @name deleteCenterExpenditures */
DELETE FROM center_expenditure
WHERE FSCL_YY = $1;