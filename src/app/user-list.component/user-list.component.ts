import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';


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

  constructor(private userService: UserService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getUsers();
        console.log('get');
      }
    });   }
  getUsers(): void {
    this.userService.getUserAPI().then(users => this.users = users);
    console.log(this.users);
    // this.userService.getUserAPI().subscribe(data => this.users = data);
  }
  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedUser.id]);
  }
}
