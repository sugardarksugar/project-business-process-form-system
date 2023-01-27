import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

export interface Form {
  title: string
  fields: Field[]
}

export interface Field {
  label: string
  type: string
  order: number
}

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {

  constructor(private api: ApiService) { }

  createForm(form: Form) {
    return this.api.post('/create-form', form, (json: any) => {
      console.log('form ok', json)
    })
  }
}
