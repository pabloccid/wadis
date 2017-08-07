import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';

import { Zone } from './zone';
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
    getZoneAPI(): Promise<Zone[]> {
        return this.http.get(`https://api.wadis.com.ar/zones`)
        .toPromise()
        .then(response => response.json().data as Zone[])
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
}
