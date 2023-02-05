-- public 스키마 삭제 후 생성
DROP SCHEMA IF EXISTS public2 CASCADE;

CREATE SCHEMA public2 AUTHORIZATION lofin_admin;

COMMENT ON SCHEMA public2 IS 'standard public2 schema';

GRANT ALL ON SCHEMA public2 TO lofin_admin;

CREATE TABLE expenditure (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sfrnd_code int NOT NULL,
  accnut_se_code text NOT NULL,
  dept_code int NOT NULL,
  detail_bsns_code text NOT NULL,
  excut_de timestamptz,
  budget_crntam bigint NOT NULL,
  nxndr bigint NOT NULL,
  cty bigint NOT NULL,
  signgunon bigint NOT NULL,
  etc_crntam bigint NOT NULL,
  expndtram bigint NOT NULL,
  orgnztnam bigint NOT NULL,
  realm_code text NOT NULL,
  sect_code text NOT NULL,
  administ_sfrnd_code int NOT NULL
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