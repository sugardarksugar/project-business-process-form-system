import { Knex } from "knex";
// import { HttpError } from "../error";

export class FormResponseService {
    constructor(private knex: Knex) { }

    async getFormDetails(form_id: number) {

        // let searchReferencedForms = await this.knex
        //     .where('form.id', form_id)
        //     .from('form')
        //     .innerJoin('form_reference', 'form_reference_form_id', 'form.id')
        //     .select('form_reference.reference_form_id')

        // for (let searchReferencedForm of searchReferencedForms) {
        //     let referencedFormFields = await this.knex
        //         .from('form')
        //         .where('form.id', searchReferencedForm.reference_form_id)
        //         .innerJoin('template', 'template.id', 'form.template_id')
        //         .innerJoin('field', 'field.template_id', 'template.id')
        //         .select('field.label', 'field.type', 'field.order')

        //     let referencedFormFieldsContent = await this.knex
        //         .from('form')
        //         .where('form.id', searchReferencedForm.reference_form_id)
        //         .innerJoin('form_response', 'form_response.form_id', 'form.id')
        //         .innerJoin('field', 'field.id', 'form_response.field_id')
        //         .select('form_response.field_id', 'form_response.content')
        // }

        let fields = await this.knex
            .where('form.id', form_id)
            .from('form')
            .innerJoin('template', 'template.id', 'form.template_id')
            .innerJoin('field', 'field.template_id', 'form.template_id')
            .select('field.id', 'field.label', 'field.type', 'field.order')

        // let fieldsContent = await this.knex
        //     .where('form.id', form_id)
        //     .from('form')
        //     .innerJoin('form_response', 'form_response.form_id', 'form.id')
        //     .innerJoin('template', 'template.id', 'form.template_id')
        //     .innerJoin('field', 'field.template_id', 'template.id')
        //     .select('form_response.content')
        console.log(form_id);

        console.log(fields);

        return { fields }

    }

    // async submitFieldsContents(submitedContent: string) {
    //     await this.knex
    //         .insert(
    //         // field_id:submitedContent.field_id,
    //         // form_id:,
    //         // content:,
    //     )
    // }
}