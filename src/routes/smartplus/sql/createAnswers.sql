/* @name createAnswers */
INSERT INTO smartplus_answer(
    answer,
    business_id,
    business_category,
    question_id
  )
SELECT *
FROM unnest(
    $1::int [],
    $2::bigint [],
    $3::int [],
    $4::bigint []
  );