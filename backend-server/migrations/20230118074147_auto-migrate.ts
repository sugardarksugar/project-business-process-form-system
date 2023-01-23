import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("user"))) {
        await knex.schema.createTable("user", (table) => {
            table.increments("id");
            table.string("email_address", 255).notNullable();
            table.string("password", 255).notNullable();
            table.string("company", 255).references("company.id");
            table.integer("level").notNullable();
        })
    }
    if (!(await knex.schema.hasTable("company"))) {
        await knex.schema.createTable("company", (table) => {
            table.increments("id");
            table.string("company", 255);
        })
    }
    if (!(await knex.schema.hasTable("template_format"))) {
        await knex.schema.createTable("template_format", (table) => {
            table.increments("id");
            table.integer("template_title").references("user.company");
            table.string("title", 255).notNullable();
            table.string("type", 255).notNullable();
            table.integer("order").notNullable();
        })
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("template_template")
}

