// lendo o arquivo dotenv
import 'dotenv/config'
// módulo para criar um schema
import { z } from 'zod'

// formato dos dados que receberemos em process.env
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())
  throw new Error('Invalid environment variables!')
}

export const env = _env.data
