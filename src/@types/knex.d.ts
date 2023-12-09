// definição de tipos
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: string
  }
}
