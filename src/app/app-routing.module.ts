import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component/dashboard.component';
import { HeroDetailComponent } from './hero-detail.component/hero-detail.component';
import { HeroesComponent } from './heroes.component/heroes.component';
import { ListContainerComponent } from './container-list.component/container-list.component';
import { ContainerMapComponent } from './container-map.component/container-map.component';
import { ListZoneComponent } from './zone-list.component/zone-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'containerlist',     component: ListContainerComponent },
  { path: 'containermap',     component: ContainerMapComponent },
  { path: 'zonelist',     component: ListZoneComponent },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
