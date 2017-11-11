import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';

import { Container, ContainerServiceResponse, States, ContainerTask, Plan } from './container';
// import { CONTAINERS } from './mock-container';

@Injectable()
export class ContainerService {

    private url_base = 'http://api.wadis.com.ar/containers';

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
            return this.http.get(this.url_base)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(this.url_base + '?page=' + page)
            .map(response => response.json())
            .catch(this.handleError);
        }

    }

    getContainersSimple() {
        return this.http.get(this.url_base + '?per_page=50')
        .map(response => response.json());
    }

    getTasksSimple() {
        return this.http.get('http://api.wadis.com.ar/tasktypes' + '?per_page=50')
        .map(response => response.json());
    }

    getContainersByZone(zone: number): Observable<ContainerServiceResponse> {
        return this.http.get('http://api.wadis.com.ar/zones/' + zone + '/containers')
        .map(response => response.json())
        .catch(this.handleError);
    }

    getContainerEdit(id: number): Observable<Container> {
        console.log('http://api.wadis.com.ar/containers/' + id);
        return this.http.get(`http://api.wadis.com.ar/containers/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);

    }

    getContainerHistory(id: number): Observable<States[]> {
        console.log('http://api.wadis.com.ar/containers/' + id + '/containerstates');
        return this.http.get('http://api.wadis.com.ar/containers/' + id + '/containerstates')
        .map(response => response.json())
        .catch(this.handleError);

    }
    
    getContainerTasks(id: number): Observable<ContainerTask[]> {
        console.log('http://api.wadis.com.ar/containers/' + id + '/containertasks');
        return this.http.get('http://api.wadis.com.ar/containers/' + id + '/containertasks')
        .map(response => response.json().data)
        .catch(this.handleError);

    }

    getContainerPlans(id: number): Observable<Plan[]> {
        console.log('http://api.wadis.com.ar/containers/' + id + '/containerplans');
        return this.http.get('http://api.wadis.com.ar/containers/' + id + '/containerplans')
        .map(response => response.json().data)
        .catch(this.handleError);

    }

    getPlansCalendar(month: number, year: number): Observable<Plan[]> {
        let headers;
        headers = new Headers();
        let formData: FormData;
        formData = new FormData();
        console.log(month.toString() + '-' + year.toString());
        formData.append('month', month.toString());
        formData.append('year', year.toString());
        headers.append('Content-Type', 'application/json');
        return this.http
        .post(`http://api.wadis.com.ar/planscalendar`, formData)
        .map(response => response.json().data)
        .catch(this.handleError);

    }

    toAddress(container) {
        let url;
        url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAXvGpoiIyFYJzErisMD_7MI-Orvobkx3g&latlng=';
        return this.http.get(url + container.latest_location.geo_x + ',' + container.latest_location.geo_y)
        .map(result => result.json().results[0].formatted_address);
    }

    updateContainer(container) {
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(this.url_base + '/' + container.id,
                        JSON.stringify({green: container.green, zone_id: container.zone_id, code: container.code}),
                        options
                    ).map(result => result.json());
    }

    deleteContainer(id: number): Observable<Container> {
        // console.log('http://api.wadis.com.ar/containers/' + id);
        return this.http.delete(`http://api.wadis.com.ar/containers/` + id)
        .map(response => response.json().data)
        .catch(this.handleError);

    }
}
