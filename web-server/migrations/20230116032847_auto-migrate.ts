import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('alter table `user` add column `is_admin` boolean not null')
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table `user` drop column `is_admin`')
}
