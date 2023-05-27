-- public 스키마 삭제 후 생성
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public AUTHORIZATION lofin_admin;

COMMENT ON SCHEMA public IS 'standard public schema';

GRANT ALL ON SCHEMA public TO lofin_admin;

CREATE TABLE local_expenditure (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sfrnd_code int NOT NULL,
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

CREATE INDEX excut_de__sfrnd_code__realm_code__detail_bsns_nm ON local_expenditure(excut_de, sfrnd_code, realm_code, detail_bsns_nm);

CREATE INDEX excut_de__realm_code__detail_bsns_nm ON local_expenditure(excut_de, realm_code, detail_bsns_nm);

CREATE TABLE center_expenditure (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  FSCL_YY int NOT NULL,
  OFFC_NM text,
  FLD_NM text NOT NULL,
  SECT_NM text NOT NULL,
  PGM_NM text NOT NULL,
  ACTV_NM text NOT NULL,
  SACTV_NM text NOT NULL,
  BZ_CLS_NM text NOT NULL,
  Y_PREY_FIRST_KCUR_AMT bigint NOT NULL,
  Y_PREY_FNL_FRC_AMT bigint NOT NULL,
  Y_YY_MEDI_KCUR_AMT bigint NOT NULL,
  Y_YY_DFN_MEDI_KCUR_AMT bigint NOT NULL
);

CREATE INDEX FSCL_YY__OFFC_NM__SACTV_NM ON center_expenditure(FSCL_YY, OFFC_NM, SACTV_NM);

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

/* 
 sgTypecode
 1: 대통령 선거
 2: 국회의원 선거
 3: 시 ∙ 도지사 선거
 4: 구 ∙ 시 ∙ 군의장 선거
 11: 교육감 선거 
 */
CREATE TABLE candidate (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sgId int NOT NULL,
  sgTypecode int NOT NULL,
  sggName text NOT NULL,
  sidoName text NOT NULL,
  wiwName text,
  partyName text,
  krName text NOT NULL
);

CREATE TABLE commitment (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  prmsRealmName text,
  prmsTitle text NOT NULL,
  prmmCont text,
  candidate_id bigint REFERENCES candidate ON DELETE CASCADE
);