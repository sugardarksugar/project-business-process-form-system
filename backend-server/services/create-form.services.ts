import { Knex } from "knex";

export class CreateFormService {
    constructor(private knex: Knex) { }
    async createForm(form: { title: string, fields: any[], }) {


        let templateId = await this.knex
            .insert({ name: form.title })
            .into('template')
            .returning('id')

        for (let field of form.fields) {
            await this.knex
                .insert({
                    template_id: templateId[0].id,
                    label: field.label,
                    type: field.type,
                    order: field.order,

                })
                .into('field')
        }
    }
}