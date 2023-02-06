import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface FormDetails {
  referenceForm: referenceForms[]
  fields: FieldDetails[]
}

export interface referenceForms {
  form_id: number,
  field: ReferenceFields[],
}

export interface ReferenceFields {
  field_id: number,
  label: string,
  type: string,
  order: number,
  content: string,
}

export interface Fields {
  filler_id: number,
  field_id: number
  label: string,
  type: string,
  order: number,
  content: string
}


export interface FieldDetails {
  filler_id: number,
  field_id: number
  label: string,
  type: string,
  order: number,
  content: string
}

export interface Contents {
  content: []
}

export interface Json {
  status: boolean,
  message: string,
}

export interface FilledForms {
  form_id: number,
  field_id: number,
  content: string,
}

@Injectable({
  providedIn: 'root'
})
export class FormResponseService {

  constructor(public api: ApiService) { }

  getFormDetails(id: number, cb: (json: FormDetails) => void) {
    this.api.get(
      `/forms/${id}/fields`, {},
      cb
    )
  }

  submitFilledForm(filledForms: FilledForms) {
    this.api.post(
      'submit/filled/form',
      filledForms,
      (json: any) => {
        if (json.status)
          alert(json.message)
      }
    )
  }
}
