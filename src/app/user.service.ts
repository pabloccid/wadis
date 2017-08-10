import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';

import { User } from './user';
// import { ZONES } from './mock-user';

@Injectable()
export class UserService {
    constructor (
        private http: Http
    ) {}
    // getUsers(): Promise<User[]> {
        // return Promise.resolve(ZONES);
    // }
    // getUsersSlowly(): Promise<User[]> {
    // return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        // setTimeout(() => resolve(this.getUsers()), 2000);
    // });
    // }
    // getUser(id: number): Promise<User> {
    // return this.getUsers()
    //             .then(users => users.find(user => user.id === id));
    // }
    getUserAPI(): Promise<User[]> {
        return this.http.get(`https://api.wadis.com.ar/users`)
        .toPromise()
        .then(response => response.json().data as User[])
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
    create(name: string): Promise<User> {
    console.log(JSON.stringify({name: name}));
    return this.http
        .post(`https://api.wadis.com.ar/users?name=` + name, JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as User)
        .catch(this.handleError);
    }
}
