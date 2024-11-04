import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from './shared/shared.module';
import { TripsComponent } from './trips/trips.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from 'src/interceptor/token.interceptor';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { UserTripsComponent } from './UserProfile/user-trips/user-trips.component';
import { PaymentComponent } from './payment/payment.component';
import { TestimonalComponent } from './testimonal/testimonal.component';
import { TestimonialElementComponent } from './testimonial-element/testimonial-element.component';
// import { TripFilterPipe } from './trip-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    TripsComponent,
    AboutusComponent,
    TripDetailsComponent,
    UserProfileComponent,
    UserTripsComponent,
    PaymentComponent,
    TestimonalComponent,
    TestimonialElementComponent
    
  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule ,
    FormsModule
    // SocialLoginModule
  ],
  
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }