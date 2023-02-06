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

  permission: 'filler' | 'viewer' = "viewer";

  constructor(
    public api: ApiService, public route: ActivatedRoute,
    public formResponseService: FormResponseService
  ) {
  }

  getFormDetails() {

    let id = +this.form_id!

    if (!id) return
    this.formResponseService.getFormDetails(id, json => {
      this.fields = json.fields
    })
  }

  async permissionStatus(): Promise<'filler' | 'viewer'> {

    return new Promise(rec => {

      let id = +this.form_id!
      let user_id;
      let filler_id;

      this.formResponseService.getFormDetails(id, json => {

        user_id = this.api.jwtPayload ? this.api.jwtPayload.id : -1
        filler_id = json.fields[0].filler_id

        console.log('wa', user_id);
        console.log('haha', filler_id);

        if (user_id == filler_id) {
          rec('filler')
        } else {
          rec('viewer')
        }

      })

    })

  }

  submitFillerForm() {
    this.formResponseService.
  }

  async ngOnInit() {
    this.getFormDetails()
    this.permission = await this.permissionStatus();
    console.log('hah', await this.permissionStatus());

  }

}
