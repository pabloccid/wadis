import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';

import { User, UserServiceResponse } from './user';
// import { ZONES } from './mock-user';

@Injectable()
export class UserService {
    root: number;
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
    // getUserAPI(): Promise<User[]> {
    //     return this.http.get(`http://api.wadis.com.ar/users`)
    //     .toPromise()
    //     .then(response => response.json().data as User[])
    //     .catch(this.handleError);
    // }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
    create(name: string,
      lastname: string,
      tipodoc: number,
      numdoc: string,
      usuariomail: string,
      usuariopassword: string,
      usuariopuesto: number,
      usuarioroot: boolean,
      zone: number): Promise<User> {
    if (usuarioroot === true) {
        this.root = 1;
    } else {
        this.root = 0;
    }
    console.log(zone);
    return this.http
        .post('http://api.wadis.com.ar/users?name=' + name +
                                       '&last_name=' + lastname +
                                        '&username=' + numdoc +
                                           '&email=' + usuariomail +
                                        '&password=' + usuariopassword +
                           '&password_confirmation=' + usuariopassword +
                                  '&identification=' + numdoc +
                                            '&root=' + this.root +
                                 '&user_profile_id=' + usuariopuesto +
                                 '&zone_id=' + zone,
                                 JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as User)
        .catch(this.handleError);
    }
    
    getUserAPI(page: number): Observable<UserServiceResponse> {
        if (page === 1) {
            return this.http.get(`http://api.wadis.com.ar/users`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`http://api.wadis.com.ar/users?page=` + page)
            .map(response => response.json())
            .catch(this.handleError);
        }
    }

    updateUser(user) {
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch('http://api.wadis.com.ar/users/' + user.id,
                        JSON.stringify({name: user.name, last_name: user.last_name, identification: user.identification,
                        email: user.email, password: user.password, zone_id: user.zone.id, user_profile_id: user.user_profile.id,
                        root: user.root, username: user.identification
                        }),
                        options
                    ).map(result => {console.log(result); result.json(); });
    }

    getUserEdit(id: number): Observable<User> {
        console.log('http://api.wadis.com.ar/users/' + id);
        return this.http.get(`http://api.wadis.com.ar/users/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete(`http://api.wadis.com.ar/users/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);
    }

}
