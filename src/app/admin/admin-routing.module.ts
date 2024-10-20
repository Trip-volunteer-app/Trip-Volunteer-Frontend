import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagecontactComponent } from './managecontact/managecontact.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServiceComponent } from './service/service.component';
import { TripImagesComponent } from './trip-images/trip-images.component';
import { TripsComponent } from './trips/trips.component';
import { ManageTripsComponent } from './manage-trips/manage-trips.component';

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
  },
  {
    path:'ManageImages/:tripId',
    component:TripImagesComponent
  },
  {
    path:'ManageTrips/:tripId',
    component:ManageTripsComponent
  },
  {
    path:'TripsInformation',
    component:TripsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
