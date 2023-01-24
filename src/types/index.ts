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
