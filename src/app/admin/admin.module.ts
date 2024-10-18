import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ManagecontactComponent } from './managecontact/managecontact.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServiceComponent } from './service/service.component';
import { VolunteerRoleComponent } from './volunteer-role/volunteer-role.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { TripVolunteerRoleComponent } from './trip-volunteer-role/trip-volunteer-role.component';
import { TripServiceComponent } from './trip-service/trip-service.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ManagecontactComponent,
    CategoriesComponent,
    ServiceComponent,
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
