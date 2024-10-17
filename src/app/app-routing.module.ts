import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthModule } from './auth/auth.module';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManagepagesComponent } from './admin/managepages/managepages.component';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: "contactus",
    component: ContactComponent
  }, {
    path: "home",
    component: HomeComponent
  }, { 
    path: '',
     redirectTo: 'home',
      pathMatch: 'full' 
  }, {
    path: 'Aboutus',
    component: AboutusComponent
  }, {
    path: 'security',
    loadChildren: () => AuthModule
  }, {
    path: 'Trips',
    component: TripsComponent
  }, {
    path: 'admin',
    loadChildren: () => AdminModule
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path:'manage',
    component:ManagepagesComponent
  }

  ,{
    path:'Trips',
    component:TripsComponent
  },
  {
    path:"tripDetails",
    component:TripDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
