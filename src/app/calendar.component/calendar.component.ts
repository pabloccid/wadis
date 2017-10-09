import { ContainerService } from './../container.service';
import { NavigationStart, ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import 'angular-calendar/dist/css/angular-calendar.css';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {   CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Plan } from '../container';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar-app',
  templateUrl: 'calendar.component.html',
  styleUrls: ['./angular-calendar.css'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnInit {
  view = 'month';
  viewDate: Date = new Date();
  lastDate: Date;
  firstDate: Date;
  private timer: Observable<number>;
  alive: boolean;
  plans: Plan[];
  refresh: Subject<any> = new Subject();
  modalData: {
    action: string;
    event: CalendarEvent;
  };



  events: CalendarEvent[];

  constructor(private containerService: ContainerService,
      private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
    // this.plans = this.containerService.getPlansCalendar(this.viewDate.getMonth(), this.viewDate.getFullYear());
    this.getTasks();
    }
    });
    this.timer = Observable.timer(0, 1000);
  }

  ngOnInit(): void {
    this.getTasks();
    // this.timer
    //       .takeWhile(() => this.alive)
    //       .subscribe(() => {
    //         this.containerService.getPlansCalendar(this.viewDate.getMonth() + 1, this.viewDate.getFullYear()).subscribe(
    //           (response) => {
    //             this.plans = response;
    //           });
    //       });
  }




  public getTasks() {
    this.events = [];
    this.containerService.getPlansCalendar(this.viewDate.getMonth() + 1, this.viewDate.getFullYear()).subscribe(
      (response) => {
        this.plans = response;
        this.firstDate = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth()), 1);
        this.lastDate = new Date(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1), 0);
        console.log(this.firstDate);
        console.log(this.lastDate);
        this.plans.forEach(element => {
          if (element.date_end === null || element.date_end > this.lastDate) {
            element.date_end = this.lastDate;
          }
          // console.log(element.date_end);


          let date_A: Date = new Date(element.date_start + ' GMT');
          date_A.setMinutes(date_A.getMinutes() + date_A.getTimezoneOffset());
          let event: CalendarEvent;
          // console.log(date_A);
          // console.log(this.lastDate);
          while (date_A <= this.lastDate) {

            if (date_A >= this.firstDate) {
              event = {
                start: new Date(date_A),
                end: new Date(date_A),
                title: element.description,
                color: colors.red
              };
              this.events.push(event);
            }
            date_A = this.nextDate(date_A, element.frecuency, element.frecuency_type_id);
            // console.log(date_A);
          }
        });
        this.refresh.next();
        console.log(this.plans);
        console.log(this.events);
      });
    // this.timer
    // .takeWhile(() => this.alive)
    // .subscribe(() => {
    //   this.containerService.getPlansCalendar(this.viewDate.getMonth() + 1, this.viewDate.getFullYear()).subscribe(
    //     (response) => {
    //       this.plans = response;
    //     });
    // });
  }

  nextDate(date, freq, freq_type): Date {
    if (freq_type === 1) {
      return new Date(date.getFullYear(), (date.getMonth()), date.getDate() + freq);
    }else if (freq_type === 2) {
      return new Date(date.getFullYear(), (date.getMonth()), date.getDate() + (freq * 7));
    }else if (freq_type === 3) {
      return new Date(date.getFullYear(), (date.getMonth() + 1), date.getDate());
    }else if (freq_type === 4) {
      return new Date(date.getFullYear(), (date.getMonth()), date.getDate() + (freq * 365));
    }
  }


}

