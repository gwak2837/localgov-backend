import { Type } from '@sinclair/typebox'

import { BadRequestError, NotFoundError } from '../../common/fastify'
import { pool } from '../../common/postgres'
import createAnswers from './sql/createAnswers.sql'
import getAnswers from './sql/getAnswers.sql'
import { IGetQuestionResult } from './sql/getQuestions'
import getQuestions from './sql/getQuestions.sql'
import { TFastify } from '..'

const decodeSmartplusQuestionCategory = {
  0: '구체성(Specific)',
  1: '측정가능성(Measurable)',
  2: '소망성(Aimed)',
  3: '적정성(Relevant)',
  4: '시간계획성(Timed)',
  5: '적극성(Positive)',
  6: '리더십(Leadership)',
  7: '소통(Understanding)',
  8: '전문성(Speciality)',
}

type QuestionCategory = keyof typeof decodeSmartplusQuestionCategory

export default async function routes(fastify: TFastify) {
  const schema = {
    querystring: Type.Object({
      businessId: Type.String(),
      businessCategory: Type.Number(),
    }),
  }

  fastify.get('/smartplus/question', { schema }, async (req, reply) => {
    const { businessId, businessCategory } = req.query

    const [{ rowCount, rows }, answersP] = await Promise.all([
      pool.query<IGetQuestionResult>(getQuestions),
      pool.query(getAnswers, [businessId, businessCategory, null]),
    ])

    if (rowCount === 0) throw NotFoundError('No active SMARTPLUS question found')

    const questions: Record<string, any> = {}

    for (const row of rows) {
      const questionCategory = row.category as QuestionCategory

      if (!questions[decodeSmartplusQuestionCategory[questionCategory]])
        questions[decodeSmartplusQuestionCategory[questionCategory]] = []

      questions[decodeSmartplusQuestionCategory[questionCategory]].push({
        id: row.id,
        content: row.content,
      })
    }

    const answers = {} as any

    for (const answer of answersP.rows) {
      answers[answer.question_id] = answer.answer
    }

    return {
      questions,
      answers,
    }
  })

  const schema2 = {
    querystring: Type.Object({
      businessId: Type.String(),
      businessCategory: Type.Number(),
    }),
  }

  fastify.get('/smartplus/answer', { schema: schema2 }, async (req, reply) => {
    const { businessId, businessCategory } = req.query

    const { rowCount, rows } = await pool.query(getAnswers, [businessId, businessCategory, 1])

    if (rowCount === 0) throw NotFoundError('No SMARTPLUS answer found')

    return rows
  })

  const schema3 = {
    body: Type.Object({
      answers: Type.Array(Type.Number()),
      businessIds: Type.Array(Type.String()),
      businessCategories: Type.Array(Type.Number()),
      questionIds: Type.Array(Type.String()),
    }),
  }

  fastify.post('/smartplus/answer', { schema: schema3 }, async (req, reply) => {
    const { answers, businessIds, businessCategories, questionIds } = req.body

    const { rowCount } = await pool.query(createAnswers, [
      businessIds,
      businessCategories,
      questionIds,
      Array(answers.length).fill(1),
      answers,
    ])

    if (rowCount === 0) throw BadRequestError('No SMARTPLUS answer created')

    return rowCount
  })
}
