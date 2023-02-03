import { Knex } from "knex";
// import { HttpError } from "../error";

export class FormResponseService {
    constructor(private knex: Knex) { }

    async getFormDetails(form_id: number) {

        let fields = await this.knex
            .where('form.id', form_id)
            .from('form')
            .innerJoin('template', 'template.id', 'form.template_id')
            .innerJoin('field', 'field.template_id', 'template.id')
            .select('field.label', 'field.type', 'field.order')


        let fieldsContent = await this.knex
            .where('form.id', form_id)
            .from('form')
            .innerJoin()

        console.log(form_id);

        console.log(fields);

        return { fields }

    }
}