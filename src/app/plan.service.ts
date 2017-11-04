import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { Plan } from './container';

import { Container, ContainerServiceResponse, States, ContainerTask, PlanServiceResponse } from './container';
// import { CONTAINERS } from './mock-container';

@Injectable()
export class PlanService {
    constructor (
        private http: Http
    ) {}

    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }


    getPlans(page: number): Observable<PlanServiceResponse> {
        if (page === 1) {
            return this.http.get(`http://api.wadis.com.ar/plans`)
            .map(response => response.json())
            .catch(this.handleError);
        } else {
            return this.http.get(`http://api.wadis.com.ar/plans?page=` + page)
            .map(response => response.json())
            .catch(this.handleError);
        }
    }

    create(description: string,
        task_id: number,
        frecuency: number,
        frecuency_type_id: number,
        date_start: string,
        date_end: string): Promise<Plan> {
      if (date_end != null && date_end !== '') {
      return this.http
          .post('http://api.wadis.com.ar/plans?description=' + description +
                                         '&task_id=' + task_id +
                                          '&frecuency=' + frecuency +
                                             '&frecuency_type_id=' + frecuency_type_id +
                                          '&date_start=' + date_start +
                             '&date_end=' + date_end,
                                   JSON.stringify({name: name}))
          .toPromise()
          .then(res => res.json().data as Plan)
          .catch(this.handleError);
      }else {
        return this.http
        .post('http://api.wadis.com.ar/plans?description=' + description +
                                       '&task_id=' + task_id +
                                        '&frecuency=' + frecuency +
                                           '&frecuency_type_id=' + frecuency_type_id +
                                        '&date_start=' + date_start,
                                 JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as Plan)
        .catch(this.handleError);
      }
    }

    getPlanEdit(id: number): Observable<Plan> {
    console.log('http://api.wadis.com.ar/plans/' + id);
    return this.http.get(`http://api.wadis.com.ar/plans/` + id)
    .map(response => response.json().data)
    .catch(this.handleError);

    }

    getContainersPlan(id: number): Observable<Container[]> {

        return this.http.get('http://api.wadis.com.ar/plans/' + id + '/containerplans/')
        .map(response => response.json().data)
        .catch(this.handleError);
    }

    assignContainerPlan(id_plan: number, id_container: number) {

        return this.http
        .post('http://api.wadis.com.ar/containers/' + id_container + '/plans/' + id_plan,
                                 JSON.stringify({name: name}))
        .toPromise()
        .then(res => res.json().data as Plan)
        .catch(this.handleError);
    }

    unassignContainerPlan(id_plan: number, id_container: number) {
                return this.http
                .delete('http://api.wadis.com.ar/containers/' + id_container + '/plans/' + id_plan,
                                         JSON.stringify({name: name}))
                .toPromise()
                .then(res => res.json().data as Plan)
                .catch(this.handleError);
    }

}
