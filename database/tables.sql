-- public 스키마 삭제 후 생성
DROP SCHEMA IF EXISTS public2 CASCADE;

CREATE SCHEMA public2 AUTHORIZATION lofin_admin;

COMMENT ON SCHEMA public2 IS 'standard public2 schema';

GRANT ALL ON SCHEMA public2 TO lofin_admin;

CREATE TABLE expenditure (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  accnut_year int NOT NULL,
  wdr_sfrnd_code text NOT NULL,
  wdr_sfrnd_code_nm text NOT NULL,
  sfrnd_code text NOT NULL,
  sfrnd_nm_korean text NOT NULL,
  accnut_se_code text NOT NULL,
  accnut_se_nm text NOT NULL,
  dept_code text NOT NULL,
  detail_bsns_code text NOT NULL,
  detail_bsns_nm text NOT NULL,
  excut_de timestamptz,
  budget_crntam bigint NOT NULL,
  nxndr bigint NOT NULL,
  cty bigint NOT NULL,
  signgunon bigint NOT NULL,
  etc_crntam bigint NOT NULL,
  expndtram bigint NOT NULL,
  orgnztnam bigint NOT NULL,
  realm_code text NOT NULL,
  realm_nm text NOT NULL,
  sect_code text NOT NULL,
  sect_nm text NOT NULL,
  administ_sfrnd_code text NOT NULL
);