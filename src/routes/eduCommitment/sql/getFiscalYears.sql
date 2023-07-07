/* @name getFiscalYears */
SELECT DISTINCT fiscal_year
FROM edu_finance
WHERE fiscal_year IS NOT NULL
ORDER BY fiscal_year;