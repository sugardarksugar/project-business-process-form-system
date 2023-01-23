import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFormPageRoutingModule } from './create-form-routing.module';

import { CreateFormPage } from './create-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFormPageRoutingModule
  ],
  declarations: [CreateFormPage]
})
export class CreateFormPageModule {}
