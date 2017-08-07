import { Component } from '@angular/core';
import { Container } from '../container';
import { ContainerService } from '../container.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';


@Component({
  selector: 'app-container-list',
  styleUrls: ['./container-list.component.css'],
  templateUrl: 'container-list.component.html',
  providers: [ContainerService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class ListContainerComponent implements OnInit {

  containers: Container[];
  selectedContainer: Container;

  constructor(private containerService: ContainerService, private router: Router) { }
  getContainers(): void {
    this.containerService.getContainerAPI().then(containers => this.containers = containers);
    // this.containerService.getContainerAPI().subscribe(data => this.containers = data);
  }
  ngOnInit(): void {
    this.getContainers();
  }

  onSelect(container: Container): void {
    this.selectedContainer = container;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedContainer.id]);
  }
}
