import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  let password = await hashPassword("123456");

  let users = [
    {
      email: "admin@gmail.com",
      hash_password: password,
      is_admin: true,
    },
    {
      email: "a@gmail.com",
      hash_password: password,
      is_admin: false,
    },
    {
      email: "b@gmail.com",
      hash_password: password,
      is_admin: false,
    },
    {
      email: "c@gmail.com",
      hash_password: password,
      is_admin: false,
    },
    {
      email: "d@gmail.com",
      hash_password: password,
      is_admin: false,
    },
    {
      email: "e@gmail.com",
      hash_password: password,
      is_admin: false,
    },
    {
      email: "f@gmail.com",
      hash_password: password,
      is_admin: false,
    },
  ];

  for (let user of users) {
    let row = await knex("user")
      .select("id")
      .where({ email: user.email })
      .first();
    if (row) {
      await knex("user").where({ id: row.id }).update(user);
    } else {
      await knex("user").insert(user);
    }
  }

  let form_i_Fields = [
    {
      template_id: 1,
      label: "Request Date",
      type: "date",
      order: 1,
    },
    {
      template_id: 1,
      label: "Request Time",
      type: "date",
      order: 2,
    },
    {
      template_id: 1,
      label: "Request Location",
      type: "text",
      order: 3,
    },
    {
      template_id: 1,
      label: "Request Description",
      type: "text",
      order: 4,
    },
    {
      template_id: 1,
      label: "Next Step Description",
      type: "text",
      order: 5,
    },
    {
      template_id: 1,
      label: "Relevant Docs",
      type: "attachment",
      order: 6,
    },
    {
      template_id: 1,
      label: "Name of Teammate",
      type: "text",
      order: 7,
    },
    {
      template_id: 1,
      label: "Title",
      type: "text",
      order: 8,
    },
    {
      template_id: 1,
      label: "Date of Submit",
      type: "date",
      order: 9,
    },
    {
      template_id: 1,
      label: "Time of Submit",
      type: "time",
      order: 10,
    },
    {
      template_id: 1,
      label: "Signature",
      type: "signature",
      order: 11,
    },
  ];

  for (let form_i_Field of form_i_Fields) {
    let row = await knex("field")
      .select("id")
      .where({
        template_id: form_i_Field.template_id,
        label: form_i_Field.label,
      })
      .first();
    if (row) {
      await knex("field").where({ id: row.id }).update(form_i_Field);
    } else {
      await knex("field").insert(form_i_Field);
    }
  }

  let form_ii_Fields = [
    {
      template_id: 2,
      label: "Accept/Reject request",
      type: "checkbox",
      order: 1,
    },
    {
      template_id: 2,
      label: "if accept: Assigned Checker name",
      type: "text",
      order: 2,
    },
    {
      template_id: 2,
      label: "if reject: reason",
      type: "text",
      order: 3,
    },
    {
      template_id: 2,
      label: "Critical items or not? (if yes, add B1 and C3, else, go C1)",
      type: "text",
      order: 4,
    },
    {
      template_id: 2,
      label: "Name of Checker",
      type: "text",
      order: 5,
    },
    {
      template_id: 2,
      label: "Title",
      type: "text",
      order: 6,
    },
    {
      template_id: 2,
      label: "Date of Submit",
      type: "date",
      order: 7,
    },
    {
      template_id: 2,
      label: "Time of Submit",
      type: "date",
      order: 8,
    },
    {
      template_id: 2,
      label: "Signature",
      type: "signature",
      order: 9,
    },
  ];

  for (let form_ii_Field of form_ii_Fields) {
    let row = await knex("field")
      .select("id")
      .where({
        template_id: form_ii_Field.template_id,
        label: form_ii_Field.label,
      })
      .first();
    if (row) {
      await knex("field").where({ id: row.id }).update(form_ii_Field);
    } else {
      await knex("field").insert(form_ii_Field);
    }
  }

  let templates = [
    {
      name: "form i template",
    },
    {
      name: "form ii template",
    },
  ];

  for (let template of templates) {
    let row = await knex("template")
      .select("id")
      .where({
        name: template.name,
      })
      .first();
    if (row) {
      await knex("template").where({ id: row.id }).update(template);
    }
    await knex("template").insert(template);
  }
}
