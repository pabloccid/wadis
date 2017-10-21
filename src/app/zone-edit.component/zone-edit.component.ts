import { ContainerService } from './../container.service';
import { Component } from '@angular/core';
import { Zone, ZoneServiceResponse } from '../zone';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Container } from '../container';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-zone-edit',
  styleUrls: ['./zone-edit.component.css'],
  templateUrl: 'zone-edit.component.html',
  providers: [ZoneService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class EditZoneComponent implements OnInit {

  zone: Zone;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;
  containers: Container[];


  constructor(private zoneService: ZoneService, private containerService: ContainerService,
              private router: Router, private route: ActivatedRoute, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getZone();
        // console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getContainers();
        // console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);        this.router = router;
    // this.getContainers();
  }
  getZone(): void {
    // this.zoneService.getZoneEdit(params.get('id')).subscribe(
    //   (response) => {
    //     this.zone = response;
    //   });
    // console.log(this.zone);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);
    this.route.paramMap
    .switchMap((params: ParamMap) => this.zoneService.getZoneEdit(+params.get('id')))
    .subscribe(zone => {
                          this.zone = zone;
                          this.getContainers();
                        });
  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.getZone();
    // console.log(this.zone);
    // this.getContainers();
  }

  // onSelect(zone: Zone): void {
  //   this.selectedZone = zone;
  // }

  postEditZone(name: Zone) {
    // console.log(name);

  }

  getContainers(): void {
    this.containerService.getContainersByZone(this.zone.id).subscribe(
    (response) => {
        this.containers = response.data;
        let this2 = this;
        this.containers.forEach(function(element, index, object) {
          // console.log(element.latest_location.address);
          if (element.latest_location.address === undefined) {
            this2.getContainerAddress(element);
          }
        });
        // this.zones.splice(0, 1);
    });
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }

  getContainerAddress(container) {
    let address;
     this.containerService.toAddress(container)
    .subscribe(result => {container.latest_location.address = result; });
  }


}
