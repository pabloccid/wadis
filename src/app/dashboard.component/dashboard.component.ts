import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-dashboard',
  providers: [AuthenticationService],
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private _service: AuthenticationService) { }

  ngOnInit(): void {
    this._service.checkCredentials();
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
