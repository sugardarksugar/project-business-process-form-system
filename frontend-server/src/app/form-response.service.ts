import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface RefPlusFormDetails {
  formDetails: FormDetails;
  referenceForms: ReferenceForms;
}

export interface FormDetails {
  // referenceForm: referenceForms[]; // TODO
  fields: Field[];
  filler_id: number;
}

export interface ReferenceForms {
  form_id: number;
  field: ReferenceFields[];
}

export interface ReferenceFields {
  field_id: number;
  label: string;
  type: string;
  order: number;
  content: string;
}

export interface Field {
  field_id: number;
  label: string;
  type: string;
  order: number;
  content: string;
}

export interface Json {
  status: boolean;
  message: string;
}

export interface FilledForms {
  form_id: number;
  field_id: number;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormResponseService {
  constructor(public api: ApiService) {}

  getFormDetails(id: number, cb: (json: RefPlusFormDetails) => void) {
    this.api.get(`/forms/${id}`, {}, cb);
  }

  submitFilledForm(filledForms: FilledForms) {
    this.api.post('/submit/filled/form', filledForms, (json: any) => {
      if (json.status) alert(json.message);
    });
  }

  saveDraft(
    id: number,
    fields: { field_id: number; content: string }[],
    cb?: (json: any) => any
  ) {
    this.api.patch(`/forms/${id}/fields`, fields, cb);
  }
}
