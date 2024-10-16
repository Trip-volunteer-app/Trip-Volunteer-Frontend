import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HttpClientModule}from  '@angular/common/http'
import { NavbarComponent } from './navbar/navbar.component'; 
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import{FormsModule}from'@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; 

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
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTableModule,
  ]
})
export class SharedModule { }
