import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';

import { Container, ContainerServiceResponse } from './container';
// import { CONTAINERS } from './mock-container';

@Injectable()
export class ContainerService {
    constructor (
        private http: Http
    ) {}
    // getContainers(): Promise<Container[]> {
    //     return Promise.resolve(CONTAINERS);
    // }
    // getContainersSlowly(): Promise<Container[]> {
    // return new Promise(resolve => {
    //     // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(this.getContainers()), 2000);
    // });
    // }
    // getContainer(id: number): Promise<Container> {
    // return this.getContainers()
    //             .then(containers => containers.find(container => container.id === id));
    // }
    // getContainerAPI(): Promise<Container[]> {
    //     const headers = new Headers();
    //     // console.log(this.http.get(`https://api.wadis.com.ar/containers`)
    //     // .map((res: Response) => res.json()));
    //     // return this.http.get(`https://api.wadis.com.ar/containers`)
    //     //     .map((res: Response) => res.json());
    //     return this.http.get(`https://api.wadis.com.ar/containers`)
    //     .toPromise()
    //     .then(response => response.json().data as Container[])
    //     .catch(this.handleError);
    // }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }

    getContainerAPI(page: number): Observable<ContainerServiceResponse> {

        if (page === 1) {
            return this.http.get(`https://api.wadis.com.ar/containers`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`https://api.wadis.com.ar/containers?page=` + page)
            .map(response => response.json())
            .catch(this.handleError);
        }

    }

    getContainersSimple() {
        return this.http.get(`https://api.wadis.com.ar/containers?per_page=50`)
        .map(response => response.json());
    }

    getContainersByZone(zone: number): Observable<ContainerServiceResponse> {
        return this.http.get('http://api.wadis.com.ar/zones/' + zone + '/containers')
        .map(response => response.json())
        .catch(this.handleError);
    }
}
