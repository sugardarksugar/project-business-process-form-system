import { proxySchema } from 'better-sqlite3-proxy'
import { db } from './db'

export type User = {
  id?: number | null
  email: string
  password_hash: string // char(60)
  is_admin: boolean
}

export type Template = {
  id?: number | null
  owner_id: number
  owner?: User
}

export type Company = {
  id?: number | null
}

export type Team = {
  id?: number | null
  company_id: number
  company?: Company
}

export type TeamMember = {
  id?: number | null
  team_id: number
  team?: Team
  user_id: number
  user?: User
}

export type CompanyAdmin = {
  id?: number | null
  company_id: number
  company?: Company
  admin_id: number
  admin?: User
}

export type Field = {
  id?: number | null
  template_id: number
  template?: Template
  order: number
  type: string
  title: string
}

export type Form = {
  id?: number | null
  template_id: number
  template?: Template
  owner_id: number
  owner?: User
  filler_id: number
  filler?: User
}

export type Response = {
  id?: number | null
  form_id: number
  form?: Form
  field_id: number
  field?: Field
  content: string
}

export type DBProxy = {
  user: User[]
  template: Template[]
  company: Company[]
  team: Team[]
  team_member: TeamMember[]
  company_admin: CompanyAdmin[]
  field: Field[]
  form: Form[]
  response: Response[]
}

export let proxy = proxySchema<DBProxy>({
  db,
  tableFields: {
    user: [],
    template: [
      /* foreign references */
      ['owner', { field: 'owner_id', table: 'user' }],
    ],
    company: [],
    team: [
      /* foreign references */
      ['company', { field: 'company_id', table: 'company' }],
    ],
    team_member: [
      /* foreign references */
      ['team', { field: 'team_id', table: 'team' }],
      ['user', { field: 'user_id', table: 'user' }],
    ],
    company_admin: [
      /* foreign references */
      ['company', { field: 'company_id', table: 'company' }],
      ['admin', { field: 'admin_id', table: 'user' }],
    ],
    field: [
      /* foreign references */
      ['template', { field: 'template_id', table: 'template' }],
    ],
    form: [
      /* foreign references */
      ['template', { field: 'template_id', table: 'template' }],
      ['owner', { field: 'owner_id', table: 'user' }],
      ['filler', { field: 'filler_id', table: 'user' }],
    ],
    response: [
      /* foreign references */
      ['form', { field: 'form_id', table: 'form' }],
      ['field', { field: 'field_id', table: 'field' }],
    ],
  },
})
