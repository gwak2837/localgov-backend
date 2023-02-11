/* @name createExpenditures */
INSERT INTO expenditure (
    sfrnd_code,
    accnut_se_code,
    accnut_se_nm,
    dept_code,
    detail_bsns_code,
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
    $2::int [],
    $3::text [],
    $4::int [],
    $5::text [],
    $6::text [],
    $7::timestamptz [],
    $8::bigint [],
    $9::bigint [],
    $10::bigint [],
    $11::bigint [],
    $12::bigint [],
    $13::bigint [],
    $14::bigint [],
    $15::int [],
    $16::int []
  );