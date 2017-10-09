import { EditPlanComponent } from './plan-edit.component/plan-edit.component';
import { NewPlanComponent } from './plan-new.component/plan-new.component';
import { CalendarComponent } from './calendar.component/calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'containerlist',     component: ListContainerComponent },
  { path: 'containermap',     component: ContainerMapComponent },
  { path: 'zonelist',     component: ListZoneComponent },
  { path: 'zonenew',     component: NewZoneComponent },
  { path: 'profilelist',     component: ListProfileComponent },
  { path: 'userlist',     component: ListUserComponent },
  { path: 'profilenew',     component: NewProfileComponent },
  { path: 'usernew',     component: NewUserComponent },
  { path: 'alertlist',     component: ListAlertComponent },
  { path: 'zoneedit/:id',     component: EditZoneComponent },
  { path: 'containeredit/:id',     component: EditContainerComponent },
  { path: 'calendar',     component: CalendarComponent },
  { path: 'planlist',     component: ListPlanComponent },
  { path: 'plannew',    component: NewPlanComponent},
  { path: 'planedit/:id',     component: EditPlanComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
