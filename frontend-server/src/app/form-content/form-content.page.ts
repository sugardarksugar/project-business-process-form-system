import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormResponseService, Fields } from '../form-response.service';

@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.page.html',
  styleUrls: ['./form-content.page.scss'],
})
export class FormContentPage implements OnInit {

  form_id = this.route.snapshot.paramMap.get('id')

  fields: Fields[] = []

  constructor(
    public api: ApiService, public route: ActivatedRoute,
    public formResponseService: FormResponseService) {
  }

  getFormDetails() {

    let id = +this.form_id!

    if (!id) return
    this.formResponseService.getFormDetails(id, json => {
      this.fields = json.fields
      console.log(json);

    })

  }

  // submitFieldsContents() {
  //   this.formResponseService.submitFieldsContents()
  // }

  ngOnInit() {
    this.getFormDetails()
  }

}
