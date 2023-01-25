import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = ''
  password = ''

  constructor(public toastCtrl: ToastController) { }

  async login() {
    let res = await fetch('http://localhost:8100/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      })
    })
    console.log({
      username: this.email,
      password: this.password,
    })
  }
  ngOnInit() {
  }
}
