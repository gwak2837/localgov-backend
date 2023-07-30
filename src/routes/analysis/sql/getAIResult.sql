/* @name getAIResult */
SELECT id,
  creation_date,
  who,
  category,
  content
FROM ai
WHERE creation_date > CURRENT_TIMESTAMP - INTERVAL '1 day'
  AND creation_date < CURRENT_TIMESTAMP
  AND business_id = $1
  AND business_category = $2
  AND commitment_id = $3;