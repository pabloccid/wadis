import { ZoneService } from './../zone.service';
import { Component } from '@angular/core';
import { Container, Location, Marker } from '../container';
import { ContainerService } from '../container.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zone } from '../zone';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-container-map',
  styleUrls: ['./container-map.component.css'],
  templateUrl: 'container-map.component.html',
  providers: [ContainerService]
})


export class ContainerMapComponent implements OnInit {
  lat = -34.614133;
  lng = -58.438936;
  zoom = 12;
  containers: Marker[] = [];
  zones: Zone[] = new Array<Zone>();

  constructor(private containerService: ContainerService,
    private zoneService: ZoneService, private router: Router, private _service: AuthenticationService) { }
  getContainers(): void {
    this.containerService.getContainersSimple().subscribe(
      (response) => {
        let this2 = this;
        response.data.forEach(function(element, index, object) {
          let marker: Marker = new Marker;
          element.icon = 'mr.png';
          if (!element.latest_location) {
            // object.splice(index, 1);
          }else {
            element.latest_location.geo_x = +element.latest_location.geo_x;
            element.latest_location.geo_y = +element.latest_location.geo_y;

          }
          marker.container = element;
          if (
            (element.latest_container_states.state_type === 1 && element.latest_container_states.states.value >= 75)
          || ((element.latest_container_states.state_type === 3 &&
            (element.latest_container_states.states.alert_type.id === 2 || element.latest_container_states.states.alert_type.id === 3))
          )) {
            marker.icon = '/assets/images/mr.png';
          }else {
            marker.icon = '/assets/images/mg.png';
          }
          this2.containers.push(marker);
        });
        console.log(this.containers);
      });
  }
  ngOnInit(): void {
    this._service.checkCredentials();

    this.getContainers();
    this.getEveryZone();
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  getEveryZone(): void {
    this.zoneService.getEveryZone().subscribe(
    (response) => {
      let zone: Zone;
      zone = {  id: 0 ,
                name: 'Todas'
             };
        this.zones[0] = zone;
        response.data.forEach(element => {
          this.zones.push(element);
        });
        // this.zones.splice(0, 1);
    });
    console.log(this.zones);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }
}
