import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-volunteer-role',
  templateUrl: './trip-volunteer-role.component.html',
  styleUrls: ['./trip-volunteer-role.component.css']
})
export class TripVolunteerRoleComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  


  constructor(public admin:AdminService,public dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.admin.getAllTripVolunteerRole();
  }

  TripVolunteerRole:FormGroup = new FormGroup({
    trip_Id:new FormControl('',Validators.required),
    volunteer_Role_Id:new FormControl('',Validators.required)
  })

  openCreateDialog() {
    this.dialog.open(this.CreateDailog)  
  }


  save(){
  this.admin.CreateTripVolunteerRole(this.TripVolunteerRole.value)
  }


  openDeleteDialog(id:number){
    //open ng-template (callDeleteDailog) 
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result!=undefined){
      if(result=='yes')
        this.admin.DeleteTripVolunteerRole(id);
      else if(result=='no')
        console.log('Thank you ');
        
    }
  })

  }

  TripVolunteerRole2:FormGroup = new FormGroup({
    trip_Volunteerroles_Id:new FormControl('',Validators.required),
    trip_Id:new FormControl('',Validators.required),
    volunteer_Role_Id:new FormControl('',Validators.required)
  })
  pData:any={}; 
  openEditDailog(obj:any){
    this.pData=obj; 
    console.log(this.pData);
    this.TripVolunteerRole2.controls['trip_Volunteerroles_Id'].setValue(this.pData.trip_Volunteerroles_Id)
    this.dialog.open(this.EditDailog)
  }

  save2(){
    this.admin.updateCategories(this.TripVolunteerRole2.value)
  }

}

