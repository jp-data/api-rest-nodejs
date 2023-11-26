import fastify from 'fastify'
import { knex } from './database'
const app = fastify()
// com a variável app fazemos toda a estrutura de funcionalidades e rotas
app.get('/hello', async () => {
  // 2º param da função: a resposta
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app
  .listen({
    port: 3333,
    // 'listen' retorna uma promise / 'then' espera a execução da promise e retorna a mensagem de servidor ok
  })
  .then(() => {
    console.log('HTTP server Running!')
  })
