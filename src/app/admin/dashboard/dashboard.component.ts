import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  NumberOfRegisteredUsers: number = 0;
  NumberOfTrips:number =0;
  NumberOfFinishedTrips:number =0;
  TotalNumberOfVolunteer=0;
  TotalNumberOfBooking=0;

  constructor(public admin: AdminService,private router:Router) {}

  ngOnInit(): void {
    this.admin.GetFiveUsersData();
    this.admin.GetFiveContactU();
    this.admin.GetSYSMonthlyRevenue();

    this.admin.NumberOfRegisteredUsers().subscribe(
      (resp: number) => {
        this.NumberOfRegisteredUsers = resp; 
        console.log('NumberOfRegisteredUsers',resp);
        
      },
      err => {
        console.error('Error fetching the number of registered users:', err);
      }
    );




    this.admin.NumberOfTrips().subscribe(
      (resp: number) => {
        this.NumberOfTrips = resp; 
        console.log('NumberOfTrips',resp);
        
      },
      err => {
        console.error('Error fetching the number of Trips:', err);
      }
    );




  
    console.log(this.admin.GetAllTripsWithMaxReservations());
    



    this.admin.TotalNumberOfVolunteer().subscribe(
      (resp: number) => {
        this.TotalNumberOfVolunteer = resp; 
      },
      err => {
        console.error('Error fetching the number of Volunteers:', err);
      }
    );



    
    this.admin.TotalNumberOfBooking().subscribe(
      (resp: number) => {
        this.TotalNumberOfBooking = resp; 
      },
      err => {
        console.error('Error fetching the number of Payment:', err);
      }
    );



    
  }


  openUsersComponent(){
    this.router.navigate(['admin/AllUsers']);
  }


  }



  

