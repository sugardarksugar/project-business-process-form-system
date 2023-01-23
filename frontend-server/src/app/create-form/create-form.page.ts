import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { CreateFormService, Form } from '../create-form.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.page.html',
  styleUrls: ['./create-form.page.scss'],
})

export class CreateFormPage implements OnInit {

  nextOrder = 1

  form: Form = {
    title: '',
    fields: [],
  }

  constructor(public createFormService: CreateFormService) {
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

    this.form.fields.push({ title: '', type: '', order: this.nextOrder })
    this.nextOrder++

  }

  removeField(i: number) {
    this.form.fields.splice(i, 1)
  }

  saveTemplate() {
    this.createFormService.createForm(this.form)

  }

  get json(): string {
    return JSON.stringify(this.form, null, 2)
  }
}

