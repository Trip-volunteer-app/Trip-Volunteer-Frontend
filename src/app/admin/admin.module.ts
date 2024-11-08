import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ManagecontactComponent } from './managecontact/managecontact.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServiceComponent } from './service/service.component';
import { ManageWebsiteInfoComponent } from './manage-website-info/manage-website-info.component';
import { ManageaboutComponent } from './manageabout/manageabout.component';
import { TripImagesComponent } from './trip-images/trip-images.component';
import { TripsComponent } from './trips/trips.component';
import { ManageTripsComponent } from './manage-trips/manage-trips.component';
import { VolunteerRoleComponent } from './volunteer-role/volunteer-role.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { TripVolunteerRoleComponent } from './trip-volunteer-role/trip-volunteer-role.component';
import { TripServiceComponent } from './trip-service/trip-service.component';
import { ReviewComponent } from './review/review.component';
import { AnuualReportComponent } from './anuual-report/anuual-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { MapsComponent } from './maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ManagehomepageComponent } from './managehomepage/managehomepage.component'; // Import this
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ViewUsersForTripsComponent } from './view-users-for-trips/view-users-for-trips.component';
import { ManageTripServicesComponent } from './manage-trip-services/manage-trip-services.component';
// import { TripFilterPipe } from '../trip-filter.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ManagecontactComponent,
    CategoriesComponent,
    ServiceComponent,
    ManageWebsiteInfoComponent,
    ManageaboutComponent,
    TripImagesComponent,
    TripsComponent,
    ManageTripsComponent,
    VolunteerRoleComponent,
    VolunteerComponent,
    TripVolunteerRoleComponent,
    TripServiceComponent,
    ReviewComponent,
    AnuualReportComponent,
    MonthlyReportComponent,
    CreateTripComponent,
    MapsComponent,
    ManagehomepageComponent,        
    UsersComponent,
    ProfileComponent,  
    ManageTestimonialComponent, ViewUsersForTripsComponent, ManageTripServicesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatStepperModule,
    MatListModule,
    SharedModule,
    GoogleMapsModule
  ]
})
export class AdminModule { }
