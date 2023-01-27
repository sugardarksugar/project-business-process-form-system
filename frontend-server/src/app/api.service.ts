import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import jwtDecode from "jwt-decode";

export type JWTPayload = {
  id: number;
  email: string;
  is_admin: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(public toastCtrl: ToastController) { }

  async showError(message: string) {
    let toast = await this.toastCtrl.create({
      message,
      duration: 3500,
      color: 'danger,'
    })
    await toast.present()
  }

  private token = localStorage.getItem('token');
  jwtPayload?: JWTPayload = this.decodeToken();

  private decodeToken(): JWTPayload | undefined {
    if (!this.token) {
      return;
    }
    return jwtDecode(this.token)
  }

  setToken(value: string) {
    this.token = value;
    this.jwtPayload = this.decodeToken();
    localStorage.setItem('token', value)

  }

  removeToken() {
    localStorage.removeItem('token');
    this.token = null;
    delete this.jwtPayload;
  }


  async post(url: string, body: object, cb: (json: any) => any) {
    let res = await fetch('http://localhost:8100' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    let json = await res.json()

    if (json.error) {
      await this.showError(json.error)
      return
    }
    cb(json)
  }
}
