import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public api: ApiService) { }

  email = ''
  password = ''

  async login() {
    await this.api.post(
      '/login',
      {
        email: this.email,
        password: this.password,
      },
      (json: any) => {
        console.log('login ok', json)
      }
    )
  }
  ngOnInit() { }
}
