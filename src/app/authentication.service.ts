import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalEventsManager} from './GlobalEventsManager';

export class UserAuth {
  constructor(
    public username: string,
    public password: string) { }
}

let users;
users = [
  new UserAuth('admin@admin.com', 'adm9'),
  new UserAuth('user1@gmail.com', 'a23')
];

@Injectable()
export class AuthenticationService {

  constructor(
    private _router: Router, private globalEventsManager: GlobalEventsManager) {}

  logout() {
    localStorage.removeItem('user');
    this.globalEventsManager.showNavBar(false);
    this._router.navigateByUrl('/login');
  }

  login(user) {
    let authenticatedUser;
    authenticatedUser = users.find(u => u.username === user.username);
    if (authenticatedUser && authenticatedUser.password === user.password) {
      localStorage.setItem('user', authenticatedUser);
      this._router.navigateByUrl('/dashboard');
      return true;
    }
    return false;

  }

   checkCredentials() {
    if (localStorage.getItem('user') === null) {
        this.globalEventsManager.showNavBar(false);
        this._router.navigateByUrl('/login');
        return false;
    }else {
        this.globalEventsManager.showNavBar(true);
        return true;
    }

  }
}

