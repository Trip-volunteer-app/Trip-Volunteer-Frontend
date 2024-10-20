import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-service',
  templateUrl: './trip-service.component.html',
  styleUrls: ['./trip-service.component.css']
})
export class TripServiceComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  


  constructor(public admin:AdminService,public dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.admin.getAllTripServices();
  }

  TripService:FormGroup = new FormGroup({
    service_Id:new FormControl('',Validators.required),
    trip_Id:new FormControl('',Validators.required)
  })

  openCreateDialog() {
    this.dialog.open(this.CreateDailog)  
  }


  save(){
  this.admin.CreateTripServices(this.TripService.value)
  }


  openDeleteDialog(id:number){
    //open ng-template (callDeleteDailog) 
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result!=undefined){
      if(result=='yes')
      {
        console.log('you choose yes');
        this.admin.DeleteTripServices(id);
      }
      else if(result=='no')
        console.log('Thank you ');
        
    }
  })

  }

  TripService2:FormGroup = new FormGroup({
    trip_Service_Id:new FormControl('',Validators.required),
    service_Id:new FormControl('',Validators.required),
    trip_Id:new FormControl('',Validators.required)
  })

  pData:any={}; 
  openEditDailog(obj:any){
    this.pData=obj; 
    console.log(this.pData);
    this.TripService2.controls['trip_Service_Id'].setValue(this.pData.trip_Service_Id)
    this.dialog.open(this.EditDailog)
  }

  save2(){
    this.admin.updateTripServices(this.TripService2.value)
  }

}

