import { Component } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';


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

  constructor(private profileService: ProfileService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getProfiles();
        console.log('get');
      }
    });   }
  getProfiles(): void {
    this.profileService.getProfileAPI().then(profiles => this.profiles = profiles);
    console.log(this.profiles);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);
  }
  ngOnInit(): void {
    this.getProfiles();
  }

  onSelect(profile: Profile): void {
    this.selectedProfile = profile;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedProfile.id]);
  }
}
