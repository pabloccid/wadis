import { EditPlanComponent } from './plan-edit.component/plan-edit.component';
import { CalendarComponent } from './calendar.component/calendar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component/app.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { ListContainerComponent } from './container-list.component/container-list.component';
import { ContainerMapComponent } from './container-map.component/container-map.component';
import { ListZoneComponent } from './zone-list.component/zone-list.component';
import { NewZoneComponent } from './zone-new.component/zone-new.component';
import { ListProfileComponent } from './profile-list.component/profile-list.component';
import { ListUserComponent } from './user-list.component/user-list.component';
import { NewProfileComponent } from './profile-new.component/profile-new.component';
import { NewUserComponent } from './user-new.component/user-new.component';
import { ListAlertComponent } from './alert-list.component/alert-list.component';
import { EditZoneComponent } from './zone-edit.component/zone-edit.component';
import { EditContainerComponent } from './container-edit.component/container-edit.component';
import { ListPlanComponent } from './plan-list.component/plan-list.component';
import { NewPlanComponent } from './plan-new.component/plan-new.component';


import { HeroService } from './hero.service';
import { ContainerService } from './container.service';
import { ZoneService } from './zone.service';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';
import { PlanService } from './plan.service';


import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { CalendarModule } from 'angular-calendar';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ToAddressPipe } from './to-address.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD22G_nbt9I-aTZs3fPTyFBMyC5Y0_Wj1A'
    }),
    BrowserModule,
    CalendarModule.forRoot(),
    NgDatepickerModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ListContainerComponent,
    ContainerMapComponent,
    ListZoneComponent,
    NewZoneComponent,
    ListProfileComponent,
    ListUserComponent,
    NewProfileComponent,
    NewUserComponent,
    ListAlertComponent,
    EditZoneComponent,
    EditContainerComponent,
    CalendarComponent,
    ListPlanComponent,
    NewPlanComponent,
    EditPlanComponent,
    ToAddressPipe
  ],
  providers: [ HeroService, ContainerService, ZoneService, ProfileService, UserService, PlanService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
