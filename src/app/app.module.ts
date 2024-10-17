import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from './shared/shared.module';
import { TripsComponent } from './trips/trips.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
=======


>>>>>>> 20cd1a9a0f37371b3908da906ae399468cd16566
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    TripsComponent,
<<<<<<< HEAD
    AboutusComponent
    
    
=======
    AboutusComponent,
    TripDetailsComponent
>>>>>>> 20cd1a9a0f37371b3908da906ae399468cd16566
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    MatDialogModule  ,
    ReactiveFormsModule,
    
    
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '947293798017-kqgorh6ss138fl5r03qg1h8qvugrgstn.apps.googleusercontent.com' // Replace with your Google client ID
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
