import { ProfileService } from './../profile.service';
import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { User, UserServiceResponse } from '../user';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Zone } from '../zone';
import {AuthenticationService} from '../authentication.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-user-edit',
  styleUrls: ['./user-edit.component.css'],
  templateUrl: 'user-edit.component.html',
  providers: [UserService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class EditUserComponent implements OnInit {

  user: User;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;
  zones: Zone[];
  profiles: Profile[];



  constructor(private userService: UserService, private zoneService: ZoneService, private profileService: ProfileService,
              private router: Router, private route: ActivatedRoute, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getUser();
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
  getUser(): void {
    // this.userService.getUserEdit(params.get('id')).subscribe(
    //   (response) => {
    //     this.user = response;
    //   });
  //   // console.log(this.user);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);
    this.route.paramMap
    .switchMap((params: ParamMap) => this.userService.getUserEdit(+params.get('id')))
    .subscribe(user => {
                          this.user = user;
                          console.log(user);
                        });
  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.getEveryProfile();
    this.getUser();
    console.log(this.user);
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


  postEditUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (response) => {
        this.router.navigateByUrl('/userlist');
      });
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

  getEveryProfile(): void {
    this.profileService.getEveryProfile().subscribe(
    (response) => {
        this.profiles = response.data;
        // this.zones.splice(0, 1);
    });
    console.log(this.profiles);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

}


}
