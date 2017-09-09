import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';

import { Zone, ZoneServiceResponse } from './zone';
import { ZONES } from './mock-zone';

@Injectable()
export class ZoneService {
    constructor (
        private http: Http
    ) {}
    getZones(): Promise<Zone[]> {
        return Promise.resolve(ZONES);
    }
    getZonesSlowly(): Promise<Zone[]> {
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getZones()), 2000);
    });
    }
    getZone(id: number): Promise<Zone> {
    return this.getZones()
                .then(zones => zones.find(zone => zone.id === id));
    }
    // getZoneAPI(): Promise<Zone[]> {
    //     return this.http.get(`https://api.wadis.com.ar/zones`)
    //     .toPromise()
    //     .then(response => response.json().data as Zone[])
    //     .catch(this.handleError);
    // }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
    create(name: string): Promise<Zone> {
        console.log(JSON.stringify({name: name}));
        return this.http
            .post(`https://api.wadis.com.ar/zones?name=` + name, JSON.stringify({name: name}))
            .toPromise()
            .then(res => res.json().data as Zone)
            .catch(this.handleError);
    }
    getZoneAPI(page: number): Observable<ZoneServiceResponse> {
        if (page === 1) {
            return this.http.get(`https://api.wadis.com.ar/zones`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`https://api.wadis.com.ar/zones?page=` + page)
            .map(response => response.json())
            .catch(this.handleError);
        }

    }
    getZoneEdit(id: number): Observable<Zone> {
            console.log('https://api.wadis.com.ar/zones/' + id);
            return this.http.get(`https://api.wadis.com.ar/zones/` + id)
            .map(response => response.json().data)
            .catch(this.handleError);

    }

    getEveryZone(): Observable<ZoneServiceResponse> {
        return this.http.get(`https://api.wadis.com.ar/zones?per_page=50`)
            .map(response => response.json())
            .catch(this.handleError);

    }
}
