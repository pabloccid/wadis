import { Component } from '@angular/core';
import { Container, Location } from '../container';
import { ContainerService } from '../container.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
  containers: Container[];
  zones: Array<String> = ['', '', ''];

  constructor(private containerService: ContainerService, private router: Router) { }
  getContainers(): void {
    this.containerService.getContainersSimple().subscribe(
      (response) => {
        this.containers = response.data;
        this.containers.forEach(function(element, index, object) {


          if (!element.latest_location) {
            // object.splice(index, 1);
          }else {
            element.latest_location.geo_x = +element.latest_location.geo_x;
            element.latest_location.geo_y = +element.latest_location.geo_y;

          }
        });
      });
  }
  ngOnInit(): void {
    this.getContainers();
  }

}
