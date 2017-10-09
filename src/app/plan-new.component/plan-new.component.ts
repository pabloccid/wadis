import { DatePipe } from '@angular/common';
import { ProfileService } from './../profile.service';
import { Observable } from 'rxjs';
import { Zone } from '../zone';
import { ListPlanComponent } from './../plan-list.component/plan-list.component';
import { Component } from '@angular/core';
import { Plan } from '../container';
import { PlanService } from '../plan.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Http } from '@angular/http';
import { ZoneService } from '../zone.service';
import { Profile } from '../profile';
import { DatepickerOptions } from 'ng2-datepicker';





@Component({
  selector: 'app-plan-new',
  styleUrls: ['./plan-new.component.css'],
  templateUrl: 'plan-new.component.html',
  providers: [PlanService, DatePipe]
})


export class NewPlanComponent implements OnInit {
    options: DatepickerOptions = {
        minYear: 2017,
        maxYear: 2050,
        displayFormat: 'DD/MM/YYYY',
        barTitleFormat: 'MMMM YYYY',
        firstCalendarDay: 1 // 0 - Sunday, 1 - Monday
       };
  data: Plan;
  zones: Zone[];
  profiles: Profile[];
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;
  public date_start: Date;
  public date_end: Date;

    constructor(private planService: PlanService, private zoneService: ZoneService,
                private profileService: ProfileService, private router: Router, public datepipe: DatePipe) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
              this.getEveryZone();
            }
          });
          this.timer = Observable.timer(0, 1000);        this.router = router;
        this.getEveryZone();
        this.date_start = new Date();
        this.date_end = new Date();

        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
              this.getEveryProfile();
            }
          });
          this.timer = Observable.timer(0, 1000);        this.router = router;
        this.getEveryProfile();
    }
    add(description: string,
      task_id: number,
      frecuency: number,
      frecuency_type_id: number,
      date_start: string,
      date_end: string): void {

//   alert(name + lastname + tipodoc + numdoc + usuariomail + usuariopassword + usuariopuesto + usuarioroot + usuarioperfil);
        if (!description || !task_id || !frecuency || !frecuency_type_id || !date_start) {return; }
        this.planService.create(description,
            task_id,
            frecuency,
            frecuency_type_id,
            this.datepipe.transform(date_start, 'yyyy-MM-dd'),
            this.datepipe.transform(date_end, 'yyyy-MM-dd'));
        // console.log(description);
        // console.log(task_id);
        // console.log(frecuency);
        // console.log(frecuency_type_id);
        // console.log(this.datepipe.transform(date_start, 'yyyy-MM-dd'));
        // console.log(this.datepipe.transform(date_end, 'yyyy-MM-dd'));
        this.router.navigateByUrl('/planlist');
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
        this.getEveryProfile();
        this.timer
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.profileService.getEveryProfile().subscribe(
                (response) => {
                    this.profiles = response.data;
                });
            });
      }

    getEveryZone(): void {
        this.zoneService.getEveryZone().subscribe(
        (response) => {
            this.zones = response.data;
            // this.zones.splice(0, 1);
        });
        // console.log(this.zones);
        // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

    }

    getEveryProfile(): void {
        this.profileService.getEveryProfile().subscribe(
        (response) => {
            this.profiles = response.data;
            // this.zones.splice(0, 1);
        });
        // console.log(this.profiles);
        // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

    }

}
