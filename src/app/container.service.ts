import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';

import { Container } from './container';
import { CONTAINERS } from './mock-container';

@Injectable()
export class ContainerService {
    constructor (
        private http: Http
    ) {}
    getContainers(): Promise<Container[]> {
        return Promise.resolve(CONTAINERS);
    }
    getContainersSlowly(): Promise<Container[]> {
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getContainers()), 2000);
    });
    }
    getContainer(id: number): Promise<Container> {
    return this.getContainers()
                .then(containers => containers.find(container => container.id === id));
    }
    getContainerAPI(): Promise<Container[]> {
        const headers = new Headers();
        console.log(this.http.get(`https://api.wadis.com.ar/containers`)
        .map((res: Response) => res.json()));
        // return this.http.get(`https://api.wadis.com.ar/containers`)
        //     .map((res: Response) => res.json());
        return this.http.get(`https://api.wadis.com.ar/containers`)
        .toPromise()
        .then(response => response.json().data as Container[])
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
}
