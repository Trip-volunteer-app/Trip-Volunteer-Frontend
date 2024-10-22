import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagecontactComponent } from './managecontact/managecontact.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServiceComponent } from './service/service.component';
import { VolunteerRoleComponent } from './volunteer-role/volunteer-role.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { TripVolunteerRoleComponent } from './trip-volunteer-role/trip-volunteer-role.component';
import { TripServiceComponent } from './trip-service/trip-service.component';
import { ReviewComponent } from './review/review.component';
import { AnuualReportComponent } from './anuual-report/anuual-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';

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
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
