import { Component, OnInit,ViewChild,TemplateRef} from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-trips',
  templateUrl: './manage-trips.component.html',
  styleUrls: ['./manage-trips.component.css']
})
export class ManageTripsComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  
  tripId!: number; 
  constructor(public admin:AdminService,public dialog: MatDialog,private router:Router,private route: ActivatedRoute)
  {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('tripId')!;
      console.log("TripId:", this.tripId);
      if (this.tripId) {
        this.admin.GetTripById(this.tripId);
      }
    });
  }
  back(){
    this.router.navigate(['admin/TripsInformation']);

  }
 
  openImages(tripId:number){
    this.router.navigate(['admin/ManageImages/', tripId]);

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

  UpdateTrips:FormGroup = new FormGroup({
    trip_Id:new FormControl('',Validators.required),
    trip_Name:new FormControl('',Validators.required),
    trip_Price:new FormControl('',Validators.required),
    start_Date:new FormControl('',Validators.required),
    end_Date:new FormControl('',Validators.required),
    max_Number_Of_Users:new FormControl('',Validators.required),
    max_Number_Of_Volunteers:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    category_Id:new FormControl('',Validators.required),
    trip_Location_Id:new FormControl('',Validators.required)
  })

  pData:any={};

  openEditDailog(obj:any){
    this.pData=obj; 
    this.UpdateTrips.controls['trip_Id'].setValue(this.pData.trip_Id)
    this.UpdateTrips.controls['category_Id'].setValue(this.pData.category_Id)
    this.UpdateTrips.controls['trip_Location_Id'].setValue(this.pData.trip_Location_Id);
    if (this.pData.end_Date) {
      this.pData.end_Date = new Date(this.pData.end_Date).toISOString().split('T')[0];
    }
    if (this.pData.start_Date) {
      this.pData.start_Date = new Date(this.pData.start_Date).toISOString().split('T')[0];
    }

    this.UpdateTrips.controls['end_Date'].setValue(this.pData.end_Date);
    this.UpdateTrips.controls['start_Date'].setValue(this.pData.start_Date);

    
    this.dialog.open(this.EditDailog)
  }

  save2(){
    console.log(this.UpdateTrips.value);

    this.admin.UpdateTrip(this.UpdateTrips.value)
  }
}

