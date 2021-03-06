import { Component } from '@angular/core';
import { Container } from '../container';
import { ContainerService } from '../container.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-alert-list',
  styleUrls: ['./alert-list.component.css'],
  templateUrl: 'alert-list.component.html',
  providers: [ContainerService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class ListAlertComponent implements OnInit {

  containers: Container[];
  selectedContainer: Container;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;

  constructor(private containerService: ContainerService, private router: Router, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getProfiles();
        // console.log('get');
      }
    });
    this.timer = Observable.timer(0, 1000);
  }
  getProfiles(): void {
    this.containerService.getContainerAPI(this.page).subscribe(
      (response) => {
        this.containers = response.data;
        this.last_page = response.last_page;
        let this2 = this;
        this.containers.forEach(function(element, index, object) {
          if (element.latest_location.address === null) {
            this2.getContainerAddress(element);
          }
        });
      });
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.page = 1;
    this.getProfiles();
    this.timer
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.containerService.getContainerAPI(this.page).subscribe(
              (response) => {
                this.containers = response.data;
                let this2 = this;
                this.containers.forEach(function(element, index, object) {
                  if (element.latest_location.address === null) {
                    this2.getContainerAddress(element);
                  }
                });
                this.last_page = response.last_page;
              });
          });
  }

  onSelect(container: Container): void {
    this.selectedContainer = container;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedContainer.id]);
  }

  public nextPage() {
    this.page ++;
    this.getProfiles();
    // console.log('Paso pagina: ' + this.last_page);
  }

  prevPage() {
    this.page --;
    this.getProfiles();
  }

  getContainerAddress(container) {
    let address;
     this.containerService.toAddress(container)
    .subscribe(result => {container.latest_location.address = result; });
  }
}
