select field.id,
    field.label,
    field.type,
    field.order,
    form_response.content
from form
    inner join template on template.id = form.template_id
    inner join field on field.template_id = template.id
    left join form_response on form_response.field_id = field.id
    and form_response.form_id = form.id
where form.id = 3
order by field.order asc -- select * from form_response