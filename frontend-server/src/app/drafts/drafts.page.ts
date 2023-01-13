import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

interface Form {
  title: string
  fields: Field[]
}

interface Field {
  title: string
  type: string
  desc: string
}

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.page.html',
  styleUrls: ['./drafts.page.scss'],
})
export class DraftsPage implements OnInit {

  form: Form = {
    title: '',
    fields: []
  }

  constructor() {
  }

  reorderForm(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log(ev);

  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete()
  };


  ngOnInit() {
    this.addField()
  }

  addField() {
    this.form.fields.push({ title: '', type: '', desc: '' })
  }

  get json(): string {
    return JSON.stringify(this, null, 2)
  }
}