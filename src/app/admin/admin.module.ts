import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ManagecontactComponent } from './managecontact/managecontact.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServiceComponent } from './service/service.component';
import { TripImagesComponent } from './trip-images/trip-images.component';
import { TripsComponent } from './trips/trips.component';
import { ManageTripsComponent } from './manage-trips/manage-trips.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ManagecontactComponent,
    CategoriesComponent,
    ServiceComponent,
    TripImagesComponent,
    TripsComponent,
    ManageTripsComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
