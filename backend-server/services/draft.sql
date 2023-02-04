select form_response.content,
    field.label,
    field.type,
    field.order
from form_response
    inner join field on field.id = form_response.field_id
    inner join template on template.id = field.template_id
    inner join form on form.template_id = template.id
order by field.order asc