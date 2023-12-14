import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {

  // listagem das transações
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists]
    },

    async (request) => {

      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    })

  // transação específica - busca por id
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists]
    },

    async (request) => {
      // validando o tipo do dado recebido em ID
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionsParamsSchema.parse(request.params)
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('id', id)
        .andWhere('session_id', sessionId)
        .first()

      return { transactions }
    })

  // resumo das transações
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists]
    },

    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    // validando os dados do req.body de acordo com o definido c/ o zod
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    //buscando uma session id 
    let sessionId = request.cookies.sessionId
    // caso não exista criamos uma
    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      })
    }

    // inserindo uma transação na tabela
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
