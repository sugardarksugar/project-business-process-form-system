import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public guestPages = [{ title: 'Login', url: 'login', icon: '' }];
  public userPages = [
    { title: 'Inbox', url: '/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Submit Form', url: '/submit/form', icon: 'document' },
    {
      title: 'Create Form Template',
      url: '/create-template',
      icon: 'document',
    },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  ];
  public adminPages = [
    { title: 'Inbox', url: '/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    {
      title: 'Create Form Template',
      url: '/create-template',
      icon: 'document',
    },
    { title: 'Create User', url: '/create/user', icon: 'document' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  ];
  public labels = [];
  constructor(public api: ApiService) {}

  get email() {
    return this.api.jwtPayload?.email;
  }

  get appPages() {
    let user = this.api.jwtPayload;
    return !user
      ? this.guestPages
      : user.is_admin
      ? this.adminPages
      : this.userPages;
  }

  logout() {
    this.api.removeToken();
    alert('Logout success');
    window.location.href = 'http://localhost:4200/login';
  }
}
