/* @name createAnswers */
INSERT INTO smartplus_answer(
    business_id,
    business_category,
    question_id,
    user_id,
    answer
  )
SELECT *
FROM unnest(
    $1::bigint [],
    $2::int [],
    $3::bigint [],
    $4::bigint [],
    $5::int []
  ) ON CONFLICT (
    business_id,
    business_category,
    question_id,
    user_id
  ) DO
UPDATE
SET answer = EXCLUDED.answer;