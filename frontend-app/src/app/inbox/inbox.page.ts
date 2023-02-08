import { Component, OnInit } from '@angular/core';
import { FillerForm, FormService, ViewerForm } from '../form.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

type AnyForm = { role: string } & (ViewerForm | FillerForm)

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})

export class InboxPage implements OnInit {


  viewerForms: ViewerForm[] = []
  fillerForms: FillerForm[] = []

  allForms: AnyForm[] = []

  constructor(private router: Router, public formService: FormService, public api: ApiService) { }

  updateAllForms() {
    this.allForms = [
      ...this.viewerForms.map(form => Object.assign(form, { role: 'viewer' })),
      ...this.fillerForms.map(form => Object.assign(form, { role: 'filler' }))
    ]
      .sort((a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime())
  }

  getSubmittedFormAsViewer() {
    let id = this.api.jwtPayload ? this.api.jwtPayload.id : -1
    this.formService.getSubmittedFormAsViewer(id, json => {
      console.log(json);
      if (json.viewerForms) {
        this.viewerForms = json.viewerForms
        this.updateAllForms()
      }
    })
  }

  getSubmittedFormAsFiller() {
    let id = this.api.jwtPayload ? this.api.jwtPayload.id : -1
    this.formService.getSubmittedFormAsFiller(id, json => {
      console.log(json);
      if (json.fillerForms) {
        this.fillerForms = json.fillerForms
        this.updateAllForms()
      }
    })
  }

  ngOnInit() {
    this.getSubmittedFormAsViewer()
    this.getSubmittedFormAsFiller()
  }
}
