import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.text('email').notNullable()
      table.specificType('password_hash', 'char(60)').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('template'))) {
    await knex.schema.createTable('template', table => {
      table.increments('id')
      table.integer('owner_id').unsigned().notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('company'))) {
    await knex.schema.createTable('company', table => {
      table.increments('id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('team'))) {
    await knex.schema.createTable('team', table => {
      table.increments('id')
      table.integer('company_id').unsigned().notNullable().references('company.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('team_member'))) {
    await knex.schema.createTable('team_member', table => {
      table.increments('id')
      table.integer('team_id').unsigned().notNullable().references('team.id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('company_admin'))) {
    await knex.schema.createTable('company_admin', table => {
      table.increments('id')
      table.integer('company_id').unsigned().notNullable().references('company.id')
      table.integer('admin_id').unsigned().notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('field'))) {
    await knex.schema.createTable('field', table => {
      table.increments('id')
      table.integer('template_id').unsigned().notNullable().references('template.id')
      table.integer('order').notNullable()
      table.string('type', 255).notNullable()
      table.string('title', 255).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('form'))) {
    await knex.schema.createTable('form', table => {
      table.increments('id')
      table.integer('template_id').unsigned().notNullable().references('template.id')
      table.integer('owner_id').unsigned().notNullable().references('user.id')
      table.integer('filler_id').unsigned().notNullable().references('user.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('response'))) {
    await knex.schema.createTable('response', table => {
      table.increments('id')
      table.integer('form_id').unsigned().notNullable().references('form.id')
      table.integer('field_id').unsigned().notNullable().references('field.id')
      table.text('content').notNullable()
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('response')
  await knex.schema.dropTableIfExists('form')
  await knex.schema.dropTableIfExists('field')
  await knex.schema.dropTableIfExists('company_admin')
  await knex.schema.dropTableIfExists('team_member')
  await knex.schema.dropTableIfExists('team')
  await knex.schema.dropTableIfExists('company')
  await knex.schema.dropTableIfExists('template')
  await knex.schema.dropTableIfExists('user')
}
