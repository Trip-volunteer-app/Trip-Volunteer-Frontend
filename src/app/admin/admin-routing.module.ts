import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagepagesComponent } from './managepages/managepages.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  }, {
    path:'manage',
    component:ManagepagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
