import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  // listagem das transações
  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return { transactions }
  })

  // transação específica - busca por id
  app.get('/:id', async (request, reply) => {
    // validando o tipo do dado recebido em ID
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionsParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()
  
    return { transaction }
})

// resumo das transações
app.get('/summary', async () => {
  const summary = await knex('transactions')
  .sum('amount', { as: 'amount'})
  .first()
  
  return {summary}
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
    // inserindo uma transação na tabela
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
