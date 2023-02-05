/* @name createExpenditures */
INSERT INTO expenditure (
    sfrnd_code,
    accnut_se_code,
    dept_code,
    detail_bsns_code,
    excut_de,
    budget_crntam,
    nxndr,
    cty,
    signgunon,
    etc_crntam,
    expndtram,
    orgnztnam,
    realm_code,
    sect_code,
    administ_sfrnd_code
  )
SELECT *
FROM unnest(
    $1::int [],
    $2::text [],
    $3::int [],
    $4::text [],
    $5::timestamptz [],
    $6::bigint [],
    $7::bigint [],
    $8::bigint [],
    $9::bigint [],
    $10::bigint [],
    $11::bigint [],
    $12::bigint [],
    $13::text [],
    $14::text [],
    $15::int []
  );