import { Component } from '@angular/core';
import { Plan } from '../container';
import { PlanService } from '../plan.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-plan-list',
  styleUrls: ['./plan-list.component.css'],
  templateUrl: 'plan-list.component.html',
  providers: [PlanService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class ListPlanComponent implements OnInit {

  plans: Plan[];
  selectedPlan: Plan;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;

  constructor(private planService: PlanService, private router: Router, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getPlans();
        console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);
  }
  getPlans(): void {
    this.planService.getPlans(this.page).subscribe(
      (response) => {
        this.plans = response.data;
        this.last_page = response.last_page;
      });
    console.log(this.plans);
    // this.planService.getPlanAPI().subscribe(data => this.plans = data);

  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.page = 1;
    this.getPlans();
    this.timer
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.planService.getPlans(this.page).subscribe(
              (response) => {
                this.plans = response.data;
                this.last_page = response.last_page;
              });
          });
  }


  public nextPage() {
    this.page ++;
    this.getPlans();
    console.log('Paso pagina: ' + this.last_page);
  }

  prevPage() {
    this.page --;
    this.getPlans();
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/planedit', id]);
  }

  delete(id: number): void {
    if (confirm('Está seguro que desea eliminar este registro?')) {
      let index;
      this.planService.deletePlan(id)
      .subscribe(result => {
                              index = this.plans.findIndex(x => x.id === result.id);
                              if (index >= 0) {
                                this.plans.splice(index, 1);
                              }
                            });
    }
  }

}
