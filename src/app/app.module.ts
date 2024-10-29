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
import {SocialLoginModule,SocialAuthServiceConfig,GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { UserTripsComponent } from './UserProfile/user-trips/user-trips.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    TripsComponent,
    AboutusComponent,
    TripDetailsComponent,
    UserProfileComponent,
    UserTripsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule ,
    
    SocialLoginModule
  ],
  
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('947293798017-lklpl72kpr2k863rm7vivjtr83qf67ar.apps.googleusercontent.com', {
            scopes: 'openid profile email',
          }),
        },
      ],
      onError: (err) => {
        console.error(err);
      },
    } as SocialAuthServiceConfig,
      },
],
  bootstrap: [AppComponent]
})
export class AppModule { }