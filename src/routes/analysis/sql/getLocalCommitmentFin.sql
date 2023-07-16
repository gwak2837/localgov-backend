/* @name getLocalCommitmentFin */
SELECT id,
  basis_date,
  category,
  fiscal_year,
  gov_expenditure AS gov,
  sido_expenditure AS sido,
  sigungu_expenditure AS sigungu,
  etc_expenditure AS etc
FROM finance
WHERE commitment_id = $1;