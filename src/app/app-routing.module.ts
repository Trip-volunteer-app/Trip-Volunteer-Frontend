import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { TripsComponent } from './trips/trips.component';
const routes: Routes = [
  { 
    path: 'Aboutus', 
    component: AboutusComponent 
  },
  {
    path:'security',
    loadChildren:()=>AuthModule
  }
  ,{path:'Trips',component:TripsComponent}

  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
