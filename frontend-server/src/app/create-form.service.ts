import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

export interface Form {
  title: string
  fields: Field[]
}

export interface Field {
  title: string
  type: string
  order: number
}

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {

  constructor(private apiService: ApiService) { }

  createForm(form: Form) {
    return this.apiService.post('/form', form)
  }
}
