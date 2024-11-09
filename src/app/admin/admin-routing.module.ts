import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { MapsComponent } from './maps/maps.component';
import { ManagehomepageComponent } from './managehomepage/managehomepage.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { TestimonalComponent } from '../testimonal/testimonal.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ViewUsersForTripsComponent } from './view-users-for-trips/view-users-for-trips.component';
import { ManageTripServicesComponent } from './manage-trip-services/manage-trip-services.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';


const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  }, 
  {
    path:'ManageContact',
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
    path:'ManageWebsiteInfo',
    component:ManageWebsiteInfoComponent
  },
  {
    path:'ManageAbout',
    component:ManageaboutComponent
  },{
    path:'ManageHome',
    component:ManagehomepageComponent
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
  },
  {
    path:'CreateTrip',
    component:CreateTripComponent
  },
  {
    path:'ManageVolunteerRole',
    component:VolunteerRoleComponent
  },
  {
    path:'ManageVolunteer',
    component:VolunteerComponent
  },
  {
    path:'ManageTripVolunteerRole',
    component:TripVolunteerRoleComponent
  },
  {
    path:'ManageTripService',
    component:TripServiceComponent
  },
  {
    path:'ManageReview',
    component:ReviewComponent
  },
  {
    path:'ManageAnuualReport',
    component:AnuualReportComponent
  },
  {
    path:'ManageMonthlyReport',
    component:MonthlyReportComponent
  },
  {
    path:'Map',
    component:MapsComponent
  },
  {
    path:'AllUsers',
    component:UsersComponent
  },
  {
    path:'AdminProfile',
    component:ProfileComponent
  },
  {
    path:'ManageTestimonial',
    component:ManageTestimonialComponent
  },
  {
    path:'ViewUsersForTrips/:trip_Id',
    component:ViewUsersForTripsComponent
  },
  {
    path:'ManageServices/:tripId',
    component:ManageTripServicesComponent
  },
  {
    path:'ManageRoles/:tripId',
    component:ManageRolesComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
