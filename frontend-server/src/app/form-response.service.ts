import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FormDetails } from './form.service';


export interface Fields {
  label: string,
  type: string,
  order: number,
  content: string,
}

export interface Contents {
  content: []
}

export interface Json {
  status: boolean,
  message: string,
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

  // submitFieldsContents(contents: Contents, cb: (json: Json) => void) {
  //   this.api.post(
  //     `/form/fields/contents`, contents,
  //     cb
  //   )
  // }

}
