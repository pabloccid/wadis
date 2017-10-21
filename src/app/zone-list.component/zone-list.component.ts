import { Component } from '@angular/core';
import { Zone, ZoneServiceResponse } from '../zone';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-zone-list',
  styleUrls: ['./zone-list.component.css'],
  templateUrl: 'zone-list.component.html',
  providers: [ZoneService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class ListZoneComponent implements OnInit {

  zones: Zone[];
  selectedZone: Zone;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;

  constructor(private zoneService: ZoneService, private router: Router, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getZones();
        console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);
  }
  getZones(): void {
    this.zoneService.getZoneAPI(this.page).subscribe(
      (response) => {
        this.zones = response.data;
        this.last_page = response.last_page;
      });
    console.log(this.zones);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.page = 1;
    this.getZones();
    this.timer
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.zoneService.getZoneAPI(this.page)
              .subscribe(
                (response) => {
                  this.zones = response.data;
                  this.last_page = response.last_page;
                });
          });
  }

  onSelect(zone: Zone): void {
    this.selectedZone = zone;
  }
  gotoDetail(id: number): void {
    this.router.navigate(['/zoneedit', id]);
  }

  public nextPage() {
    this.page ++;
    this.getZones();
    console.log('Paso pagina: ' + this.last_page);
  }

  prevPage() {
    this.page --;
    this.getZones();
  }

}
