import { Component } from '@angular/core';
import { Container } from '../container';
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
    this.containerService.getContainers().then(containers => this.containers = containers);
  }
  ngOnInit(): void {
    this.getContainers();
  }

}
