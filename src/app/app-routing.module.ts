import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthModule } from './auth/auth.module';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AdminModule } from './admin/admin.module';
import { authorizationGuard } from './authorization/authorization.guard';

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
    loadChildren: () => AdminModule,
    // canActivate:[authorizationGuard]
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
