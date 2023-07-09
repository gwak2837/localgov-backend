/* @name getAIResult */
SELECT id,
  creation_date,
  who,
  kind,
  content
FROM ai
WHERE creation_date > CURRENT_TIMESTAMP - INTERVAL '1 day'
  AND creation_date < CURRENT_TIMESTAMP
  AND category = $1
  AND reference_id = $2;