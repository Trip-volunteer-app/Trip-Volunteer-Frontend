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
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TripsCardComponent } from './trips-card/trips-card.component';
import { TokenInterceptor } from 'src/interceptor/token.interceptor';
import { NgChartsModule } from 'ng2-charts';


 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    TripsComponent,
    AboutusComponent,
    TripDetailsComponent,
    TripsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    MatDialogModule  ,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }