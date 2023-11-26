import { Knex } from 'knex'

// 'up': ação da migration
export async function up(knex: Knex): Promise<void> {
  // criação da tabela
  await knex.schema.createTable('transactions', (table) => {
    // colunas
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

// 'down' remove tabela
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
