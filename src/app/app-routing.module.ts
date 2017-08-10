import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component/dashboard.component';
import { ListContainerComponent } from './container-list.component/container-list.component';
import { ContainerMapComponent } from './container-map.component/container-map.component';
import { ListZoneComponent } from './zone-list.component/zone-list.component';
import { NewZoneComponent } from './zone-new.component/zone-new.component';
import { ListProfileComponent } from './profile-list.component/profile-list.component';
import { ListUserComponent } from './user-list.component/user-list.component';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'containerlist',     component: ListContainerComponent },
  { path: 'containermap',     component: ContainerMapComponent },
  { path: 'zonelist',     component: ListZoneComponent },
  { path: 'zonenew',     component: NewZoneComponent },
  { path: 'profilelist',     component: ListProfileComponent },
  { path: 'userlist',     component: ListUserComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
