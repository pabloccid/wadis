import { DatepickerOptions } from 'ng2-datepicker';
import { PlanService } from './../plan.service';
import { Component } from '@angular/core';
import { Plan, PlanServiceResponse, States, ContainerTask } from '../container';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Zone } from '../zone';

@Component({
  selector: 'app-plan-edit',
  styleUrls: ['./plan-edit.component.css'],
  templateUrl: 'plan-edit.component.html',
  providers: [PlanService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class EditPlanComponent implements OnInit {
    options: DatepickerOptions = {
        minYear: 2017,
        maxYear: 2050,
        displayFormat: 'DD/MM/YYYY',
        barTitleFormat: 'MMMM YYYY',
        firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
        };
  plan: Plan;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;
//   states: States[];
//   zones: Zone[];
//   tasks: ContainerTask[];


  constructor(private planService: PlanService, private zoneService: ZoneService,
              private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getPlan();
        console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);
    // router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     this.getHistory();
    //     console.log('get');
    //   }
    // });
    // this.timer = Observable.timer(0, 1000);        this.router = router;
    // this.getHistory();
  }
  getPlan(): void {
    // this.planService.getPlanEdit(params.get('id')).subscribe(
    //   (response) => {
    //     this.plan = response;
    //   });
  //   // console.log(this.plan);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);
    this.route.paramMap
    .switchMap((params: ParamMap) => this.planService.getPlanEdit(+params.get('id')))
    .subscribe(plan => {
                          this.plan = plan;
                        //   this.getHistory();
                        //   this.getTasks();
                        console.log(plan);
                        });
  }
  ngOnInit(): void {
    this.getPlan();
    console.log(this.plan);
    // this.getHistory();
    // this.getEveryZone();
    // this.timer
    //       .takeWhile(() => this.alive)
    //       .subscribe(() => {
    //         this.zoneService.getEveryZone().subscribe(
    //           (response) => {
    //             this.zones = response.data;
    //           });
    //       });
  }

  // onSelect(plan: Plan): void {
  //   this.selectedPlan = plan;
  // }

  postEditPlan(name: Plan) {
    console.log(name);

  }

//   getHistory(): void {
//     this.planService.getPlanHistory(this.plan.id).subscribe(
//     (response) => {
//         this.states = response;
//         console.log(this.states);
//         // this.plans.splice(0, 1);
//     });
//     // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

//   }
//   getTasks(): void {
//     this.planService.getPlanTasks(this.plan.id).subscribe(
//     (response) => {
//         this.tasks = response;
//         console.log(this.tasks);
//         // this.plans.splice(0, 1);
//     });
//     // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

//   }

//   getEveryZone(): void {
//     this.zoneService.getEveryZone().subscribe(
//     (response) => {
//         this.zones = response.data;
//         // this.zones.splice(0, 1);
//     });
//     console.log(this.zones);
//     // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

//   }


}
