import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_origin = 'http://locatlhost:4200'
  constructor() { }

  async post(url: string, body: object) {
    let res = await fetch(this.api_origin + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    let json = await res.json()
    return json
  }
}
