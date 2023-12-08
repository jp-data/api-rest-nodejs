import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
    // 'listen' retorna uma promise / 'then' espera a execução da promise e retorna a mensagem de servidor ok
  })
  .then(() => {
    console.log('HTTP server Running!')
  })
