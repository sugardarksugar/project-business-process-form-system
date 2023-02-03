import { Component, OnInit } from '@angular/core';
import { FormService, SearchFormResult, SearchResultForm, SubmitFormContent } from '../form.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.page.html',
  styleUrls: ['./submit-form.page.scss'],
})
export class SubmitFormPage implements OnInit {


  constructor(public formService: FormService, public api: ApiService) { }

  templateName = ''

  searchResult?: SearchFormResult;

  // templateId?: number;

  submitFormContent: SubmitFormContent = {
    title: '',
    template_id: 0,
    viewer_emails: '',
    filler_email: ''
  }

  searchTemplate() {
    this.formService.searchFormsByTitle(this.templateName, json => {
      this.searchResult = json
      console.log(json);
    })
  }

  selectedForm(form: SearchResultForm) {
    this.submitFormContent.template_id = form.id
    this.templateName = form.name
  }

  submitForm() {

    // this.api.jwtPayload = {} as anys
    // this.api.jwtPayload && (this.api.jwtPayload.id = +submitFormContent.creatorId)
    // this.submitFormContent.title = submitFormContent.title
    // this.templateId = submitFormContent.templateId
    // this.submitFormContent.fillerId = submitFormContent.fillerId
    // submitFormContent.viewers.email = submitFormContent.viewers.email
    this.formService.submitForm(this.submitFormContent)
  }

  ngOnInit() {
  }
}
