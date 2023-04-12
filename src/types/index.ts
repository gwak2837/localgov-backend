export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type Expenditure = {
  accnut_year: any
  wdr_sfrnd_code: any
  wdr_sfrnd_code_nm: any
  sfrnd_code: any
  sfrnd_nm_korean: any
  accnut_se_code: any
  accnut_se_nm: any
  dept_code: any
  detail_bsns_code: any
  detail_bsns_nm: any
  excut_de: any
  budget_crntam: any
  nxndr: any
  cty: any
  signgunon: any
  etc_crntam: any
  expndtram: any
  orgnztnam: any
  realm_code: any
  realm_nm: any
  sect_code: any
  sect_nm: any
  administ_sfrnd_code: any
  sort_ordr: any
}

export type CenterExpenditure = {
  FSCL_YY: string
  OFFC_NM: string
  FSCL_NM: string
  ACCT_NM: string | null
  FLD_NM: string
  SECT_NM: string
  PGM_NM: string
  ACTV_NM: string
  SACTV_NM: string
  BZ_CLS_NM: string
  FIN_DE_EP_NM: string
  ANEXP_INQ_STND_CD: string
  Y_PREY_FIRST_KCUR_AMT: number
  Y_PREY_FNL_FRC_AMT: number
  Y_YY_MEDI_KCUR_AMT: number
  Y_YY_DFN_MEDI_KCUR_AMT: number
}

export type ErrorHead = {
  RESULT: {
    CODE: string
    MESSAGE: string
  }
}

export type Head = [{ list_total_count: number }, { RESULT: { CODE: string; MESSAGE: string } }]
