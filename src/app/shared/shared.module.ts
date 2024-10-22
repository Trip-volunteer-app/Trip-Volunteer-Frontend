import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { NavbarComponent } from './navbar/navbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterPipe } from '../pipes/filter.pipe';




@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRadioModule,
    MatTooltipModule,
    FilterPipe
  ]
})
export class SharedModule { }
