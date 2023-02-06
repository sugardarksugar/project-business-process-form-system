import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface Form {
  title: string
  fields: Field[]
}

export interface Field {
  label: string
  type: string
  order: number
}

export interface SearchFormResult {
  forms: SearchResultForm[]
}

export interface SearchResultForm {
  id: number,
  name: string,
}

export interface SubmitFormContent {
  title: string,
  template_id: number,
  filler_email: string,
  viewer_emails: string
}
export interface SearchSubmittedFormForViewer {
  fillerForms: any;
  viewerForms: any;
  forms: ViewerForm[]
}
export interface ViewerForm {
  form_id: number
  submitted_title: string
  creator_email: string
  submit_time: string
}

export interface SearchSubmittedFormForFiller {
  fillerForms: any;
  forms: FillerForm[]
}

export interface FillerForm {
  form_id: number
  submitted_title: string
  creator_email: string
  submit_time: string
}

export interface FormDetails {
  fields: FieldDetails[]
}

export interface FieldDetails {
  label: string,
  type: string,
  order: number,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private api: ApiService) { }

  createForm(form: Form) {
    return this.api.post(
      '/form',
      form,
      (json: any) => {
        if (json.status) {
          alert(json.message)
        }
        if (!json.status) {
          alert(json.message)
        }
      })
  }

  async searchFormsByTitle(title: string, cb: (json: SearchFormResult) => void) {
    return this.api.get(
      '/form/search',
      { title },
      cb
    )
  }

  async submitForm(submitFormContent: SubmitFormContent) {
    return this.api.post(
      '/form/submit',
      {
        ...submitFormContent,
        viewer_emails: submitFormContent.viewer_emails.split(',')
      },
      (json: any) => {
        if (json.status) {
          alert(json.message)
        }
        if (!json.status) {
          alert(json.message)
        }
      })
  }

  async getSubmittedFormAsViewer(id: number, cb: (json: SearchSubmittedFormForViewer) => void) {
    return this.api.get(
      '/form/as/viewer',
      { id },
      cb
    )
  }

  async getSubmittedFormAsFiller(id: number, cb: (json: SearchSubmittedFormForViewer) => void) {
    return this.api.get(
      '/form/as/filler',
      { id },
      cb
    )
  }

}