import { ContainerService } from './../container.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { ProfileService } from './../profile.service';
import { Component } from '@angular/core';
import { States, ContainerTask, Container, Task, TaskType } from '../container';
import { Profile, ProfileServiceResponse } from '../profile';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Zone } from '../zone';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-profile-edit',
  styleUrls: ['./profile-edit.component.css'],
  templateUrl: 'profile-edit.component.html',
  providers: [ProfileService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class EditProfileComponent implements OnInit {
    options: DatepickerOptions = {
        minYear: 2017,
        maxYear: 2050,
        displayFormat: 'DD/MM/YYYY',
        barTitleFormat: 'MMMM YYYY',
        firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
        };
  profile: Profile;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;
  tasksAssigned: Task[] = [];
  taskTypeAssigned: TaskType[] = [];
  tasks: TaskType[] = [];
//   states: States[];
//   zones: Zone[];
//   tasks: ContainerTask[];


  constructor(private profileService: ProfileService, private zoneService: ZoneService, private containerService: ContainerService,
              private router: Router, private route: ActivatedRoute, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getProfile();
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
  getProfile(): void {
    // this.profileService.getProfileEdit(params.get('id')).subscribe(
    //   (response) => {
    //     this.profile = response;
    //   });
  //   // console.log(this.profile);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);
    this.route.paramMap
    .switchMap((params: ParamMap) => this.profileService.getProfileEdit(+params.get('id')))
    .subscribe(profile => {
                          this.profile = profile;
                          this.getTasks();
                        //   this.getHistory();
                        //   this.getTasks();
                        // console.log(profile);
                        });

  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.getProfile();
    console.log(this.profile);

  }

  getTasks(): void {
    this.containerService.getTasksSimple().subscribe(
      (response) => {
          this.tasks = response.data;

          this.getTasksProfile(this.profile.id);

          console.log(this.tasks);
          // this.zones.splice(0, 1);
      });
      // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);  }
  }

  getTasksProfile(id: number): void {
    this.profileService.getTasksProfile(id).subscribe(
    (response) => {
        this.tasksAssigned = response;
        this.tasksAssigned.sort((a, b) => a.id - b.id);
        let index: number;
        let this2 = this;
        this.tasksAssigned.forEach(element => {
          this2.taskTypeAssigned.push(element.task_type);
          index = this.tasks.findIndex(x => x.id === element.task_type.id);
          // console.log(index);
          if (index >= 0) {
            this.tasks.splice(index, 1);
          }
          // console.log(this.containers);
        });
        console.log(this.taskTypeAssigned);
        this.taskTypeAssigned.sort((a, b) => a.id - b.id);

        // this.zones.splice(0, 1);
    });
    console.log(this.tasksAssigned);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }

  public assign(id_profile: number, id_tasktype: number) {
    this.profileService.assignTaskProfile(id_profile, id_tasktype);
    let task: TaskType;
    let index: number;
    index = this.tasks.findIndex(x => x.id === id_tasktype);
    task = this.tasks[index];
    // console.log(container);
    this.tasks.splice(index, 1);
    this.taskTypeAssigned.push(task);
    this.taskTypeAssigned.sort((a, b) => a.id - b.id);
  }

  public unassign(id_profile: number, id_container: number) {
    // this.profileService.assignContainerProfile(id_profile, id_container);
    let task: TaskType;
    let index: number;
    index = this.taskTypeAssigned.findIndex(x => x.id === id_container);
    task = this.taskTypeAssigned[index];
    // console.log(container);
    this.taskTypeAssigned.splice(index, 1);
    this.tasks.push(task);
    this.tasks.sort((a, b) => a.id - b.id);
  }


  getContainerAddress(container) {
    let address;
     this.containerService.toAddress(container)
    .subscribe(result => {container.latest_location.address = result; });
  }

  postEditProfile(profile: Profile) {
    this.profileService.updateProfile(profile).subscribe(
      (response) => {
        this.router.navigateByUrl('/profilelist');
      });
  }

}

