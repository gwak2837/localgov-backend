import { InternalServerError } from './fastify'

export function decodeElectionTypeCode(electionTypeCode: number) {
  switch (electionTypeCode) {
    case 1:
      return '대통령 선거'
    case 2:
      return '국회의원 선거'
    case 3:
      return '시·도지사 선거'
    case 4:
      return '구·시·군의 장 선거'
    case 5:
      return '시·도 의회의원 선거'
    case 6:
      return '구·시·군 의회의원 선거'
    case 7:
      return '비례대표 국회의원 선거'
    case 8:
      return '광역의원 비례대표 선거'
    case 9:
      return '기초의원 비례대표 선거'
    case 10:
      return '교육의원 선거'
    case 11:
      return '교육감 선거'
    default:
      throw InternalServerError('Invalid `sgTypecode`')
  }
}
