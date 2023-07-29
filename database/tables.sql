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

/* 
 FSCL_YY 회계연도	
 OFFC_NM	소관명	
 FLD_NM	분야명	
 SECT_NM	부문명	
 PGM_NM	프로그램명	
 ACTV_NM	단위사업명	
 SACTV_NM	세부사업명	
 BZ_CLS_NM	경비구분	
 Y_PREY_FIRST_KCUR_AMT 전년도국회확정금액	
 Y_PREY_FNL_FRC_AMT 전년도최종금액	
 Y_YY_MEDI_KCUR_AMT 정부안금액	
 Y_YY_DFN_MEDI_KCUR_AMT 국회확정금액 
 */
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

/* 
 category
 0: 지자체장
 1: 교육감
 */
CREATE TABLE election (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category int NOT NULL,
  election_date date NOT NULL,
  location int NOT NULL
);

CREATE TABLE commitment (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  content text,
  primary_dept text [],
  support_dept text [],
  main_body text [],
  start_period int NOT NULL,
  end_period int NOT NULL,
  field_code int NOT NULL,
  sector_code int,
  priority int,
  progress int,
  center_gov_aid int [],
  election_id bigint NOT NULL REFERENCES election ON DELETE CASCADE
);

/* 
 category
 0: 지자체장
 1: 교육감
 2: 교육감
 3: 교육감
 */
CREATE TABLE finance (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text,
  category int NOT NULL,
  basis_date date NOT NULL,
  fiscal_year int,
  gov bigint,
  sido bigint,
  sigungu bigint,
  etc bigint,
  commitment_id bigint NOT NULL REFERENCES commitment ON DELETE CASCADE
);

CREATE TABLE "user" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_time timestamptz DEFAULT CURRENT_TIMESTAMP,
  nickname text,
  oauth_kakao varchar(100) UNIQUE,
  phone_number varchar(20) UNIQUE
);

CREATE TABLE smartplus_question (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  content text NOT NULL,
  category int NOT NULL,
  is_visible boolean NOT NULL
);

CREATE TABLE smartplus_answer (
  business_id bigint NOT NULL,
  business_category int NOT NULL,
  question_id bigint NOT NULL REFERENCES smartplus_question ON DELETE CASCADE,
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
  answer int NOT NULL,
  --
  PRIMARY KEY (business_id, business_category, question_id, user_id)
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

CREATE TABLE commitment2 (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  prmsRealmName text,
  prmsTitle text NOT NULL,
  prmmCont text,
  candidate_id bigint REFERENCES candidate ON DELETE CASCADE
);

CREATE TABLE ai (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  who int NOT NULL,
  category int NOT NULL,
  reference_id bigint NOT NULL,
  kind int NOT NULL,
  content text NOT NULL
);