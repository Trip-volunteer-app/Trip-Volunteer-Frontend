import { Component, OnInit,ViewChild,TemplateRef} from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  

  constructor(public admin:AdminService,public dialog: MatDialog,private router:Router)
  {}

  ngOnInit(): void {
    this.admin.GetAllTrips();
    console.log(this.admin)
  }

 
  ManageTrip(tripId:number){
    this.router.navigate(['admin/ManageTrips/', tripId]);

  }
  

}
