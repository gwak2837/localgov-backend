/* @name getQuestion */
SELECT id,
  content,
  category,
  is_visible
FROM smartplus_question
WHERE is_visible = TRUE;