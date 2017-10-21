import { Component } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-profile-list',
  styleUrls: ['./profile-list.component.css'],
  templateUrl: 'profile-list.component.html',
  providers: [ProfileService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class ListProfileComponent implements OnInit {

  profiles: Profile[];
  selectedProfile: Profile;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;

  constructor(private profileService: ProfileService, private router: Router, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getProfiles();
        console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);
  }
  getProfiles(): void {
    this.profileService.getProfileAPI(this.page).subscribe(
      (response) => {
        this.profiles = response.data;
        this.last_page = response.last_page;
      });
    console.log(this.profiles);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.page = 1;
    this.getProfiles();
    this.timer
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.profileService.getProfileAPI(this.page).subscribe(
              (response) => {
                this.profiles = response.data;
                this.last_page = response.last_page;
              });
          });
  }

  // onSelect(profile: Profile): void {
  //   this.selectedProfile = profile;
  // }
  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedProfile.id]);
  // }

  public nextPage() {
    this.page ++;
    this.getProfiles();
    console.log('Paso pagina: ' + this.last_page);
  }

  prevPage() {
    this.page --;
    this.getProfiles();
  }
}
