import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()
// com a variável app fazemos toda a estrutura de funcionalidades e rotas
app.get('/hello', async () => {
  // Inserindo uma transação na tabela
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    // retornando as informações inseridas
    .returning('*')

  return transaction
})

// buscando as transações inseridas na tabela
app.get('/transactions', async () => {
  const transaction = await knex('transactions')
    // condição
    .where('amount', 1000)
    .select('*')
  return transaction
})

app
  .listen({
    port: env.PORT,
    // 'listen' retorna uma promise / 'then' espera a execução da promise e retorna a mensagem de servidor ok
  })
  .then(() => {
    console.log('HTTP server Running!')
  })
