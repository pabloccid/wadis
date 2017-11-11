import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
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
    //     return this.http.get(`http://api.wadis.com.ar/zones`)
    //     .toPromise()
    //     .then(response => response.json().data as Zone[])
    //     .catch(this.handleError);
    // }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
    create(name: string): Promise<Zone> {
        // console.log(JSON.stringify({name: name}));
        return this.http
            .post(`http://api.wadis.com.ar/zones?name=` + name, JSON.stringify({name: name}))
            .toPromise()
            .then(res => res.json().data as Zone)
            .catch(this.handleError);
    }
    getZoneAPI(page: number): Observable<ZoneServiceResponse> {
        if (page === 1) {
            return this.http.get(`http://api.wadis.com.ar/zones`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`http://api.wadis.com.ar/zones?page=` + page)
            .map(response => response.json())
            .catch(this.handleError);
        }

    }
    getZoneEdit(id: number): Observable<Zone> {
            console.log('http://api.wadis.com.ar/zones/' + id);
            return this.http.get(`http://api.wadis.com.ar/zones/` + id)
            .map(response => response.json().data)
            .catch(this.handleError);

    }

    getEveryZone(): Observable<ZoneServiceResponse> {
        return this.http.get(`http://api.wadis.com.ar/zones?per_page=50`)
            .map(response => response.json())
            .catch(this.handleError);

    }

    deleteZone(id: number): Observable<Zone> {
        return this.http.delete(`http://api.wadis.com.ar/zones/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);
    }

    updateZone(zone) {
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(`http://api.wadis.com.ar/zones` + '/' + zone.id,
                        JSON.stringify({name: zone.name}),
                        options
                    ).map(result => result.json());
    }
}
