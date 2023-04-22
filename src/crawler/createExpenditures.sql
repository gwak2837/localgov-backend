/* @name createExpenditures */
INSERT INTO expenditure (
    sfrnd_code,
    detail_bsns_nm,
    excut_de,
    budget_crntam,
    nxndr,
    cty,
    signgunon,
    etc_crntam,
    expndtram,
    orgnztnam,
    realm_code,
    sect_code
  )
SELECT *
FROM unnest(
    $1::int [],
    $2::text [],
    $3::timestamptz [],
    $4::bigint [],
    $5::bigint [],
    $6::bigint [],
    $7::bigint [],
    $8::bigint [],
    $9::bigint [],
    $10::bigint [],
    $11::int [],
    $12::int []
  );