import { ContainerService } from './../container.service';
import { Component } from '@angular/core';
import { Container, ContainerServiceResponse, States, ContainerTask, Plan } from '../container';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Zone } from '../zone';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-container-edit',
  styleUrls: ['./container-edit.component.css'],
  templateUrl: 'container-edit.component.html',
  providers: [ContainerService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class EditContainerComponent implements OnInit {

  container: Container;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;
  states: States[];
  zones: Zone[];
  tasks: ContainerTask[];
  plans: Plan[];


  constructor(private containerService: ContainerService, private zoneService: ZoneService,
              private router: Router, private route: ActivatedRoute, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getContainer();
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
  getContainer(): void {
    // this.containerService.getContainerEdit(params.get('id')).subscribe(
    //   (response) => {
    //     this.container = response;
    //   });
  //   // console.log(this.container);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);
    this.route.paramMap
    .switchMap((params: ParamMap) => this.containerService.getContainerEdit(+params.get('id')))
    .subscribe(container => {
                          this.container = container;
                          this.getHistory();
                          this.getTasks();
                          this.getPlans();
                        });
  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.getContainer();
    console.log(this.container);
    // this.getHistory();
    this.getEveryZone();
    this.timer
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.zoneService.getEveryZone().subscribe(
              (response) => {
                this.zones = response.data;
              });
          });
  }

  // onSelect(container: Container): void {
  //   this.selectedContainer = container;
  // }

  postEditContainer(container: Container) {
    this.containerService.updateContainer(container).subscribe(
      (response) => {
        this.router.navigateByUrl('/containerlist');
      });
  }

  getHistory(): void {
    this.containerService.getContainerHistory(this.container.id).subscribe(
    (response) => {
        this.states = response;
        console.log(this.states);
        // this.containers.splice(0, 1);
    });
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }
  getTasks(): void {
    this.containerService.getContainerTasks(this.container.id).subscribe(
    (response) => {
        this.tasks = response;
        console.log(this.tasks);
        // this.containers.splice(0, 1);
    });
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }

  getPlans(): void {
    this.containerService.getContainerPlans(this.container.id).subscribe(
    (response) => {
        this.plans = response;
        console.log(this.plans);
        // this.containers.splice(0, 1);
    });
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }

  getEveryZone(): void {
    this.zoneService.getEveryZone().subscribe(
    (response) => {
        this.zones = response.data;
        // this.zones.splice(0, 1);
    });
    console.log(this.zones);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }


}
