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
import { VolunteerRoleComponent } from './volunteer-role/volunteer-role.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { TripVolunteerRoleComponent } from './trip-volunteer-role/trip-volunteer-role.component';
import { TripServiceComponent } from './trip-service/trip-service.component';
import { ReviewComponent } from './review/review.component';

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
    VolunteerRoleComponent,
    VolunteerComponent,
    TripVolunteerRoleComponent,
    TripServiceComponent,
    ReviewComponent
        
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
