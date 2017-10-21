import { Component, OnInit } from '@angular/core';
import {AuthenticationService, UserAuth} from '../../authentication.service';
import {GlobalEventsManager} from '../../GlobalEventsManager';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavBar = false;
  constructor(private _service: AuthenticationService, private globalEventsManager: GlobalEventsManager) { }

  ngOnInit() {
    this.globalEventsManager.showNavBarEmitter.subscribe((mode) => {

      this.showNavBar = mode;
  });
    this._service.checkCredentials();
  }

}
