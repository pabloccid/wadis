import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { Profile, ProfileServiceResponse } from './profile';
// import { ZONES } from './mock-profile';

@Injectable()
export class ProfileService {
    constructor (
        private http: Http
    ) {}
    // getProfiles(): Promise<Profile[]> {
    //     return Promise.resolve(ZONES);
    // }
    // getProfilesSlowly(): Promise<Profile[]> {
    // return new Promise(resolve => {
    //     // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(this.getProfiles()), 2000);
    // });
    // }
    // getProfile(id: number): Promise<Profile> {
    // return this.getProfiles()
    //             .then(profiles => profiles.find(profile => profile.id === id));
    // }
    getProfileAPI(page: number): Observable<ProfileServiceResponse> {
        if (page === 1) {
            return this.http.get(`https://api.wadis.com.ar/userprofiles`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`https://api.wadis.com.ar/userprofiles?page=` + page)
            .map(response => response.json())
            .catch(this.handleError);
        }
    }


    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
    create(name: string): Promise<Profile> {
    console.log(JSON.stringify({name: name}));
    return this.http
        .post(`https://api.wadis.com.ar/userprofiles?name=` + name, JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as Profile)
        .catch(this.handleError);
    }
}
