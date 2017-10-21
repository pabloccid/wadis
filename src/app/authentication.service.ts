import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalEventsManager} from './GlobalEventsManager';
import { Http, Response } from '@angular/http';

export class UserAuth {
  constructor(
    public username: string,
    public password: string) { }
}



@Injectable()
export class AuthenticationService {

  constructor(
    private _router: Router, private globalEventsManager: GlobalEventsManager, private http: Http) {}

  logout() {
    localStorage.removeItem('user');
    this.globalEventsManager.showNavBar(false);
    this._router.navigateByUrl('/login');
  }

  login(user) {
    return this.http
    .post('http://api.wadis.com.ar/login?email=' + user.username + '&password=' + user.password,
                            JSON.stringify({name: name}))
                            .map((res: Response) => {
                              if (res.json().data) {
                                localStorage.setItem('user', user.username);
                                this._router.navigateByUrl('/dashboard');
                                return true;
                              }else {
                                return false;
                              }
                            }).subscribe(
                              (response) => {
                              });
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


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
