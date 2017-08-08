import { Component } from '@angular/core';
import { Zone } from '../zone';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';


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

  constructor(private zoneService: ZoneService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getZones();
        console.log('get');
      }
    });   }
  getZones(): void {
    this.zoneService.getZoneAPI().then(zones => this.zones = zones);
    console.log(this.zones);
    // this.zoneService.getZoneAPI().subscribe(data => this.zones = data);
  }
  ngOnInit(): void {
    this.getZones();
  }

  onSelect(zone: Zone): void {
    this.selectedZone = zone;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedZone.id]);
  }
}
