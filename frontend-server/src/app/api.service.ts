import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
// export class ApiService0 {
//   api_origin = 'http://locatlhost:4200'
//   constructor() { }

//   async post(url: string, body: object) {
//     let res = await fetch(this.api_origin + url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     })
//     let json = await res.json()
//     return json
//   }
// }

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