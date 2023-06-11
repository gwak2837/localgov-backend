import { Type } from '@sinclair/typebox'

import { cefinOfficeNames } from '../../common/cefin'
import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import { IGetCefinResult } from './sql/getCefin'
import getCefin from './sql/getCefin.sql'
import { IGetCefinByOfficeResult } from './sql/getCefinByOffice'
import getCefinByOffice from './sql/getCefinByOffice.sql'
import { TFastify } from '..'

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      yearFrom: Type.Number(),
      yearTo: Type.Number(),

      isField: Type.Optional(Type.Boolean()),
      fieldsOrSectors: Type.Optional(Type.Array(Type.String())),
      count: Type.Optional(Type.Number()),
      officeNames: Type.Optional(Type.Array(Type.String())),
    }),
  }

  fastify.get('/expenditure/center', { schema }, async (req) => {
    // Querystring validation
    const {
      yearFrom,
      yearTo,
      isField,
      fieldsOrSectors: _fieldsOrSectors,
      count: _count,
      officeNames: _officeNames,
    } = req.query

    const fieldsOrSectors = _fieldsOrSectors?.map((c) => decodeURIComponent(c))
    const count = _count ?? 30
    const officeNames = _officeNames?.map((c) => decodeURIComponent(c))

    if (yearFrom < 2000 || yearFrom > 2030) throw BadRequestError('Invalid `yearFrom`')
    if (yearTo < 2000 || yearTo > 2030) throw BadRequestError('Invalid `yearTo`')
    if (yearFrom > yearTo) throw BadRequestError('Invalid `yearFrom`')

    if (isField === undefined && fieldsOrSectors) throw BadRequestError('Invalid `fieldsOrSectors`')
    if (isField !== undefined && !fieldsOrSectors)
      throw BadRequestError('Invalid `fieldsOrSectors`')

    if (count > 100) throw BadRequestError('Invalid `count`')

    if (officeNames && !officeNames.every((officeName) => cefinOfficeNames.includes(officeName)))
      throw BadRequestError('Invalid `officeNames`')

    // Query SQL
    const { rowCount, rows } = officeNames
      ? await pool.query<IGetCefinByOfficeResult>(getCefinByOffice, [
          officeNames,
          yearFrom,
          yearTo,
          isField,
          fieldsOrSectors,
          count,
        ])
      : await pool.query<IGetCefinResult>(getCefin, [
          yearFrom,
          yearTo,
          isField,
          fieldsOrSectors,
          count,
        ])

    if (rowCount === 0)
      throw NotFoundError('No expenditure could be found that satisfies these conditions...')

    return {
      amchart: rows.map((row: any) => ({
        [officeNames ? 'sactv_nm' : 'offc_nm']: officeNames ? row.sactv_nm : row.offc_nm,
        y_yy_dfn_medi_kcur_amt: Math.floor(+(row.y_yy_dfn_medi_kcur_amt ?? 0) / 1000),
        y_yy_medi_kcur_amt: Math.floor(+(row.y_yy_medi_kcur_amt ?? 0) / 1000),
      })),
      cefin: rows.map((row: any) => ({
        [officeNames ? 'sactv_nm' : 'offc_nm']: officeNames ? row.sactv_nm : row.offc_nm,
        y_yy_dfn_medi_kcur_amt: Math.floor(+(row.y_yy_dfn_medi_kcur_amt ?? 0) * 1000),
        y_yy_medi_kcur_amt: Math.floor(+(row.y_yy_medi_kcur_amt ?? 0) * 1000),
      })),
    }
  })
}
