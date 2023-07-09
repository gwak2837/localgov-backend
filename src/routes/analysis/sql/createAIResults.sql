/* @name createAIResults */
INSERT INTO ai (who, category, reference_id, kind, content)
SELECT *
FROM unnest(
    $1::int [],
    $2::int [],
    $3::bigint [],
    $4::int [],
    $5::text []
  );