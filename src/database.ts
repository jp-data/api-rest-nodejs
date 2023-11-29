// ler o arquivo com as vars de ambiente
import 'dotenv/config'
// conexão com o banco de dados
import { knex as setupKnex, Knex } from 'knex'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not found.')
}

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
