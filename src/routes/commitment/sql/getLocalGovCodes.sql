/* @name getLocalGovCodes */
SELECT DISTINCT district
FROM election
WHERE category = $1
ORDER BY district;