import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HttpClientModule}from  '@angular/common/http'
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';


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
