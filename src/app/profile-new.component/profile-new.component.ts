import { ListProfileComponent } from './../profile-list.component/profile-list.component';
import { Component } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-profile-new',
  styleUrls: ['./profile-new.component.css'],
  templateUrl: 'profile-new.component.html',
  providers: [ProfileService]
})


export class NewProfileComponent {

  data: Profile;

  constructor(private profileService: ProfileService, private router: Router) {

    this.router = router;
   }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.profileService.create(name);
  this.router.navigateByUrl('/profilelist');
}
}
