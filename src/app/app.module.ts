import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component/app.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { HeroDetailComponent } from './hero-detail.component/hero-detail.component';
import { HeroesComponent } from './heroes.component/heroes.component';
import { ListContainerComponent } from './container-list.component/container-list.component';
import { ContainerMapComponent } from './container-map.component/container-map.component';
import { ListZoneComponent } from './zone-list.component/zone-list.component';


import { HeroService } from './hero.service';
import { ContainerService } from './container.service';
import { ZoneService } from './zone.service';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD22G_nbt9I-aTZs3fPTyFBMyC5Y0_Wj1A'
    })
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    ListContainerComponent,
    ContainerMapComponent,
    ListZoneComponent,
  ],
  providers: [ HeroService, ContainerService, ZoneService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
