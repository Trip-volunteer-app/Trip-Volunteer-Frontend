import { Component, OnInit,ViewChild,TemplateRef} from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-users-for-trips',
  templateUrl: './view-users-for-trips.component.html',
  styleUrls: ['./view-users-for-trips.component.css']
})
export class ViewUsersForTripsComponent implements OnInit{
  trip_Id!: number; 

  
constructor(public toase:ToastrService ,public admin:AdminService,public dialog: MatDialog,private router:Router,private route: ActivatedRoute)
{}

ngOnInit(): void {
  
  this.route.paramMap.subscribe(params => {
    this.trip_Id = +params.get('trip_Id')!;
    console.log("trip_Id:", this.trip_Id);
    if (this.trip_Id) {
      this.admin.GetTripById(this.trip_Id);
    }
  });
  console.log('befor call admin',this.trip_Id)
  this.admin.GetVolunteerUserInfoByTripId1(this.trip_Id);
  this.admin.GetUserPaymentsForTrip1(this.trip_Id);
}
}




