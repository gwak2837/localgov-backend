-- public 스키마 삭제 후 생성
DROP SCHEMA IF EXISTS public2 CASCADE;

CREATE SCHEMA public2 AUTHORIZATION lofin_admin;

COMMENT ON SCHEMA public2 IS 'standard public2 schema';

GRANT ALL ON SCHEMA public2 TO lofin_admin;

CREATE TABLE expenditure (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sfrnd_code int NOT NULL,
  accnut_se_code int NOT NULL,
  accnut_se_nm text NOT NULL,
  dept_code int NOT NULL,
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
  realm_code int NOT NULL,
  sect_code int NOT NULL
);

CREATE INDEX expenditure__date__local_gov__project ON expenditure (
  excut_de,
  sfrnd_code,
  realm_code,
  budget_crntam DESC
);

CREATE INDEX expenditure__date__local_gov ON expenditure (excut_de, sfrnd_code, budget_crntam DESC);

CREATE INDEX expenditure__date__project ON expenditure (excut_de, realm_code, budget_crntam DESC);

CREATE INDEX expenditure__date ON expenditure (excut_de, budget_crntam DESC);

CREATE TABLE smart_evaluation (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  s1 int NOT NULL,
  s2 int NOT NULL,
  s3 int NOT NULL,
  m1 int NOT NULL,
  m2 int NOT NULL,
  a1 int NOT NULL,
  a2 int NOT NULL,
  a3 int NOT NULL,
  r1 int NOT NULL,
  r2 int NOT NULL,
  r3 int NOT NULL,
  t1 int NOT NULL,
  t2 int NOT NULL
);