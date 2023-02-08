import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface User {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public api: ApiService) { }

  async login(user: User) {

    await this.api.post(
      '/login',
      user,
      (json: any) => {
        console.log('login', json);

        if (json.status)
          alert(json.message)

        if (json.token) {
          this.api.setToken(json.token)
        }
      }
    )
  }

  async createUser(user: User) {
    await this.api.post(
      '/create-user',
      user,
      (json: any) => {
        if (json.status)
          alert(json.message)
      }
    )
  }
}
