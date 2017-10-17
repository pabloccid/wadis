import { ContainerService } from './../container.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { PlanService } from './../plan.service';
import { Component } from '@angular/core';
import { Plan, PlanServiceResponse, States, ContainerTask, Container } from '../container';
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
  containersAssigned: Container[] = [];
  containers: Container[] = [];
//   states: States[];
//   zones: Zone[];
//   tasks: ContainerTask[];


  constructor(private planService: PlanService, private zoneService: ZoneService, private containerService: ContainerService,
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
                          this.getContainers();
                        //   this.getHistory();
                        //   this.getTasks();
                        // console.log(plan);
                        });

  }
  ngOnInit(): void {
    this.getPlan();
    console.log(this.plan);

  }


  postEditPlan(name: Plan) {
    console.log(name);

  }




  getContainers(): void {
    this.containerService.getContainersSimple().subscribe(
      (response) => {
          this.containers = response.data;

          this.getContainersPlan(this.plan.id);
          let this2 = this;
          this.containers.forEach(function(element, index, object) {
            // console.log(element.latest_location.address);
            if (element.latest_location.address === undefined) {
              this2.getContainerAddress(element);
            }
          });
          // console.log(this.containers);
          // this.zones.splice(0, 1);
      });
      // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);  }
  }

  getContainersPlan(id: number): void {
    this.planService.getContainersPlan(id).subscribe(
    (response) => {
        this.containersAssigned = response;
        this.containersAssigned.sort((a, b) => a.id - b.id);
        let index: number;
        let this2 = this;
        this.containersAssigned.forEach(element => {
          if (element.latest_location.address === undefined) {
            this2.getContainerAddress(element);
          }
          index = this.containers.findIndex(x => x.id === element.id);
          // console.log(index);
          if (index >= 0) {
            this.containers.splice(index, 1);
          }
          // console.log(this.containers);
        });

        // this.zones.splice(0, 1);
    });
    // console.log(this.containersAssigned);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }

  public assign(id_plan: number, id_container: number) {
    this.planService.assignContainerPlan(id_plan, id_container);
    let container: Container;
    let index: number;
    index = this.containers.findIndex(x => x.id === id_container);
    container = this.containers[index];
    // console.log(container);
    this.containers.splice(index, 1);
    this.containersAssigned.push(container);
    this.containersAssigned.sort((a, b) => a.id - b.id);
  }

  public unassign(id_plan: number, id_container: number) {
    // this.planService.assignContainerPlan(id_plan, id_container);
    let container: Container;
    let index: number;
    index = this.containersAssigned.findIndex(x => x.id === id_container);
    container = this.containersAssigned[index];
    // console.log(container);
    this.containersAssigned.splice(index, 1);
    this.containers.push(container);
    this.containers.sort((a, b) => a.id - b.id);
  }


  getContainerAddress(container) {
    let address;
     this.containerService.toAddress(container)
    .subscribe(result => {container.latest_location.address = result; });
  }

}

// function findID(container) {
//   return container.id =
// }
