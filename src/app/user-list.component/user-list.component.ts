import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-user-list',
  styleUrls: ['./user-list.component.css'],
  templateUrl: 'user-list.component.html',
  providers: [UserService]
})

// @Pipe({ name: 'keys',  pure: false })
// export class ObjectComponent implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }

export class ListUserComponent implements OnInit {

  users: User[];
  selectedUser: User;
  alive: boolean;
  private timer: Observable<number>;
  public page: number;
  public last_page: number;

  constructor(private userService: UserService, private router: Router, private _service: AuthenticationService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getUsers();
        console.log('get');
      }
    });
    this.timer = Observable.timer(0, 100);
  }
  getUsers(): void {
    this.userService.getUserAPI(this.page).subscribe(
      (response) => {
        this.users = response.data;
        this.last_page = response.last_page;
      });
    console.log(this.users);
    // this.profileService.getProfileAPI().subscribe(data => this.profiles = data);

  }
  ngOnInit(): void {
    this._service.checkCredentials();
    this.page = 1;
    this.getUsers();
    this.timer
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.userService.getUserAPI(this.page).subscribe(
              (response) => {
                this.users = response.data;
                this.last_page = response.last_page;
              });
          });
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/useredit', id]);
  }

  public nextPage() {
    this.page ++;
    this.getUsers();
    console.log('Paso pagina: ' + this.last_page);
  }

  prevPage() {
    this.page --;
    this.getUsers();
  }
}
