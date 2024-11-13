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
import { UsersComponent } from './admin/users/users.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { UserTripsComponent } from './UserProfile/user-trips/user-trips.component';
import { PaymentComponent } from './payment/payment.component';
import { TestimonalComponent } from './testimonal/testimonal.component';
import { TestimonialElementComponent } from './testimonial-element/testimonial-element.component';
import { ReviewComponent } from './admin/review/review.component';

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
    path:"tripDetails/:tripId",
    component:TripDetailsComponent
  },
  {
    path:"userProfile",
    component:UserProfileComponent

  },
  {
    path:"UserTrips",
    component:UserTripsComponent
  },{
    path:"payment/:id",
    component:PaymentComponent
  },
  {
    path:"Testimonial",
    component:TestimonalComponent
  },
  {
    path:"TestimonialElement",
    component:TestimonialElementComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
