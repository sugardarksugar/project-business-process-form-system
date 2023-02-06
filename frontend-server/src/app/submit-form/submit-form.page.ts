import { Component, OnInit } from '@angular/core';
import {
  FormService,
  SearchFormResult,
  SearchReferenceFormResult,
  SearchResultForm,
  SearchResultReferenceForm,
  SubmitFormContent,
} from '../form.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.page.html',
  styleUrls: ['./submit-form.page.scss'],
})
export class SubmitFormPage implements OnInit {
  constructor(public formService: FormService, public api: ApiService) {}

  templateName = '';
  referenceFormName = '';

  searchResult?: SearchFormResult;
  searchReferenceResult?: SearchReferenceFormResult;

  // templateId?: number;

  submitFormContent: SubmitFormContent = {
    title: '',
    referenceForms_ids: '',
    template_id: 0,
    viewer_emails: '',
    filler_email: '',
  };
  selectedRefForms: SearchResultReferenceForm[] = [];

  searchTemplate() {
    this.formService.searchFormsByTitle(this.templateName, (json) => {
      this.searchResult = json;
      console.log(json);
    });
  }

  searchReferenceFormsByTitle() {
    this.formService.searchReferenceFormsByTitle(
      this.referenceFormName,
      (json) => {
        this.searchReferenceResult = json;
        console.log(json);
      }
    );
  }

  selectRefForm(form: SearchResultReferenceForm) {
    if (this.hasSelectedRefForm(form)) return;
    this.selectedRefForms.push(form);
  }

  unselectRefForm(form: SearchResultReferenceForm) {
    let idx = this.selectedRefForms.findIndex((f) => f.id == form.id);
    this.selectedRefForms.splice(idx, 1);
  }

  hasSelectedRefForm(form: SearchResultReferenceForm) {
    return this.selectedRefForms.some((f) => f.id == form.id);
  }

  selectedForm(form: SearchResultForm) {
    this.submitFormContent.template_id = form.id;
    this.templateName = form.name;
  }

  submitForm() {
    // this.api.jwtPayload = {} as anys
    // this.api.jwtPayload && (this.api.jwtPayload.id = +submitFormContent.creatorId)
    // this.submitFormContent.title = submitFormContent.title
    // this.templateId = submitFormContent.templateId
    // this.submitFormContent.fillerId = submitFormContent.fillerId
    // submitFormContent.viewers.email = submitFormContent.viewers.email
    this.formService.submitForm(this.submitFormContent);
    console.log(this.submitFormContent);
  }

  ngOnInit() {}
}
