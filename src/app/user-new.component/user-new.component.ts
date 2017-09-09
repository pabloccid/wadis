import { Observable } from 'rxjs';
import { Zone } from '../zone';
import { ListUserComponent } from './../user-list.component/user-list.component';
import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Http } from '@angular/http';
import { ZoneService } from '../zone.service';



@Component({
  selector: 'app-user-new',
  styleUrls: ['./user-new.component.css'],
  templateUrl: 'user-new.component.html',
  providers: [UserService]
})


export class NewUserComponent implements OnInit {

  data: User;
  zones: Zone[];
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;

    constructor(private userService: UserService, private zoneService: ZoneService, private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
              this.getEveryZone();
              console.log('get');
            }
          });
          this.timer = Observable.timer(0, 1000);        this.router = router;
        this.getEveryZone();
    }
    add(name: string,
      lastname: string,
      tipodoc: number,
      numdoc: string,
      usuariomail: string,
      usuariopassword: string,
      usuariopuesto: number,
      usuarioroot: boolean,
      zone: number): void {

//   alert(name + lastname + tipodoc + numdoc + usuariomail + usuariopassword + usuariopuesto + usuarioroot + usuarioperfil);
        if (!name || !lastname || !tipodoc || !numdoc || !usuariomail ||
            !usuariopassword || !usuariopuesto || !usuarioroot || !zone) {return; }
        this.userService.create(name,
            lastname,
            tipodoc,
            numdoc,
            usuariomail,
            usuariopassword,
            usuariopuesto,
            usuarioroot,
            zone);
        console.log(zone);
        // this.router.navigateByUrl('/userlist');
    }

    ngOnInit(): void {
        this.page = 1;
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
