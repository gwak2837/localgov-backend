/* @name getAnswers */
SELECT id,
  answer,
  business_id,
  business_category,
  question_id
FROM smartplus_answer
WHERE business_id = $1
  AND business_category = $2
  AND(
    $3::bigint IS NULL
    OR user_id = $3
  );