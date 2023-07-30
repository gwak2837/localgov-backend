/* @name createAIResults */
INSERT INTO ai (
    who,
    business_id,
    business_category,
    commitment_id,
    category,
    content
  )
SELECT *
FROM unnest(
    $1::int [],
    $2::bigint [],
    $3::int [],
    $4::bigint [],
    $5::int [],
    $6::text []
  );