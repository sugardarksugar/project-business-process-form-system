import { Knex } from "knex";
// import { HttpError } from "../error";

export interface FilledFormFields {
  form_id: number;
  field_id: number;
  content: string;
}

export interface FilledForm {
  filledFormFields: FilledFormFields[];
}

export class FormResponseService {
  constructor(private knex: Knex) {}

  async getFormDetails(form_id: number) {
    let referenceFields = [];

    let searchReferencedForms = await this.knex
      .where("form.id", form_id)
      .from("form")
      .innerJoin("form_reference", "reference_form_id", "form.id")
      .select("form_reference.reference_form_id");

    for (let searchReferencedForm of searchReferencedForms) {
      let referencedFormFields = await this.knex
        .from("form")
        .where("form.id", searchReferencedForm.reference_form_id)
        .innerJoin("template", "template.id", "form.template_id")
        .innerJoin("field", "field.template_id", "template.id")
        .select("field.label", "field.type", "field.order");

      let referencedFormFieldsContent = await this.knex
        .from("form")
        .where("form.id", searchReferencedForm.reference_form_id)
        .innerJoin("form_response", "form_response.form_id", "form.id")
        .innerJoin("field", "field.id", "form_response.field_id")
        .select("form_response.field_id", "form_response.content");
      referenceFields = referencedFormFields.concat(
        referencedFormFieldsContent
      );
    }

    let form = await this.knex
      .where("form.id", form_id)
      .from("form")
      .select("form.filler_id")
      .first();

    let filler_id = form?.filler_id;

    let fields = await this.knex
      .where("form.id", form_id)
      .from("form")
      .innerJoin("template", "template.id", "form.template_id")
      .innerJoin("field", "field.template_id", "form.template_id")
      .leftJoin("form_response", "form_response.field_id", "field.id")
      .select(
        "field.id as field_id",
        "field.label",
        "field.type",
        "field.order",
        "form_response.content"
      )
      .orderBy("field.order", "asc");

    // let fieldsContent = await this.knex
    //     .where('form.id', form_id)
    //     .from('form')
    //     .innerJoin('form_response', 'form_response.form_id', 'form.id')
    //     .innerJoin('template', 'template.id', 'form.template_id')
    //     .innerJoin('field', 'field.template_id', 'template.id')
    //     .select('form_response.content')
    console.log("filler_id", filler_id);
    console.log("fields", fields);
    console.log("searchReferencedForms", searchReferencedForms);
    console.log("referenceFields", referenceFields);

    return {
      formDetails: { fields, filler_id },
      referenceForms: {
        form_id: searchReferencedForms,
        field: referenceFields,
      },
    };
  }

  async saveDraft(
    form_id: number,
    fields: { field_id: number; content: string }[]
  ) {
    await this.knex.transaction(async (knex) => {
      for (let field of fields) {
        let row = await knex("form_response")
          .select("id")
          .where({ form_id, field_id: field.field_id })
          .first();
        if (row) {
          await knex("form_response")
            .where({ id: row.id })
            .update({ content: field.content });
        } else {
          await knex("form_response").insert({
            form_id,
            field_id: field.field_id,
            content: field.content,
          });
        }
      }
    });
    return {};
  }

  //   async submitFilledForm() {
  //     await this.knex
  //       .insert
  //       // field_id:submitedContent.field_id,
  //       // form_id:,
  //       // content:,
  //       ();
  //   }

  // async submitFilledForm(filledFormFields: FilledFormFields) {
  //     for (let field of filledFormFields)
  // }
}
