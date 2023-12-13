import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    // 'listen' retorna uma promise / 'then' espera a execução da promise e retorna a mensagem de servidor ok
  })
  .then(() => {
    console.log('HTTP server Running!')
  })
