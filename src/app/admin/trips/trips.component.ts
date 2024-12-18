import { Component, OnInit,ViewChild,TemplateRef} from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface TripDetails {
  tripId: number;
  destination: string;
  startDate: string;
  endDate: string;
  details: string; 
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  


    trip_Name: string = '';
    checkInDate: Date | null = null;
    checkOutDate: Date | null = null;
    minPrice: number | null = null; 
    maxPrice: number | null = null; 


    
  constructor(public admin:AdminService,public dialog: MatDialog,private router:Router)
  {}

  ngOnInit(): void {
    this.admin.GetAllTrips();
    console.log(this.admin)
  }
  
  openDeleteDialog(id:number){
    console.log(id)
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result != undefined){
      if(result == 'yes')
        this.admin.DeleteTrip(id);
      else if(result == 'no')
        console.log('Thank you ');
        
    }
  })
  }

 
  ManageTrip(tripId:number){
    this.router.navigate(['admin/ManageTrips/', tripId]);

  }
  
  goTo(){
    this.router.navigate(['admin/CreateTrip']);

  }

  ManagePersonal(trip_Id:number)
  {
    this.router.navigate(['admin/ViewUsersForTrips/', trip_Id]);
  }
}
