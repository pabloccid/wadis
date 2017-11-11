import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { Profile, ProfileServiceResponse } from './profile';
import { Task, TaskType } from './container';
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
            return this.http.get(`http://api.wadis.com.ar/userprofiles`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`http://api.wadis.com.ar/userprofiles?page=` + page)
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
        .post(`http://api.wadis.com.ar/userprofiles?name=` + name, JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as Profile)
        .catch(this.handleError);
    }

    getEveryProfile(): Observable<ProfileServiceResponse> {
        return this.http.get(`http://api.wadis.com.ar/userprofiles?per_page=50`)
            .map(response => response.json())
            .catch(this.handleError);

    }

    getProfileEdit(id: number): Observable<Profile> {
        console.log('http://api.wadis.com.ar/userprofiles/' + id);
        return this.http.get(`http://api.wadis.com.ar/userprofiles/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);

    }

    getTasksProfile(id: number): Observable<Task[]> {
        return this.http.get('http://api.wadis.com.ar/userprofiles/' + id + '/tasks/')
        .map(response => response.json().data)
        .catch(this.handleError);
    }

    assignTaskProfile(id_profile: number, id_task: number) {

        return this.http
        .post('http://api.wadis.com.ar/userprofiles/' + id_profile + '/tasktypes/' + id_task,
                                    JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as Profile)
        .catch(this.handleError);
    }

    deleteProfile(id: number): Observable<Profile> {
        return this.http.delete(`http://api.wadis.com.ar/userprofiles/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);
    }

    updateProfile(profile) {
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(`http://api.wadis.com.ar/userprofiles` + '/' + profile.id,
                        JSON.stringify({name: profile.name}),
                        options
                    ).map(result => result.json());
    }
}
