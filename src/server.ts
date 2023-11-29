import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
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

app
  .listen({
    port: 3333,
    // 'listen' retorna uma promise / 'then' espera a execução da promise e retorna a mensagem de servidor ok
  })
  .then(() => {
    console.log('HTTP server Running!')
  })
