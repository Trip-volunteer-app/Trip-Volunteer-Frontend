import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HttpClientModule}from  '@angular/common/http'
import { NavbarComponent } from './navbar/navbar.component'; 
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
