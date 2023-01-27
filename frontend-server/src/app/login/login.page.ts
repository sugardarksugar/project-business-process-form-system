import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public api: ApiService, public userService: UserService) { }

  user: User = {
    email: '',
    password: '',
  }

  login() {
    this.userService.login(this.user)
  }

  ngOnInit() { }
}


