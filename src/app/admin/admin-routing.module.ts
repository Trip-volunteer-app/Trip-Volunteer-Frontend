import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagecontactComponent } from './managecontact/managecontact.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  }, 
  {
    path:'manage',
    component:ManagecontactComponent
  },
  {
    path:'ManageCategories',
    component:CategoriesComponent
  },
  {
    path:'ManageServices',
    component:ServiceComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
