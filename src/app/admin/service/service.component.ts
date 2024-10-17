import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  


  constructor(public admin:AdminService,public dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.admin.getAllServices();
  }

  Services:FormGroup = new FormGroup({
    service_Name:new FormControl('',Validators.required),
    service_Cost:new FormControl('',Validators.required)
  })

  openCreateDialog() {
    this.dialog.open(this.CreateDailog)  
  }


  save(){
  this.admin.CreateServices(this.Services.value)
  }


  openDeleteDialog(id:number){
    //open ng-template (callDeleteDailog) 
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result!=undefined){
      if(result=='yes')
        this.admin.DeleteServices(id);
      else if(result=='no')
        console.log('Thank you ');
        
    }
  })

  }

  service2:FormGroup = new FormGroup({
    service_Id:new FormControl(),
    service_Name:new FormControl('',Validators.required),
    service_Cost:new FormControl('',Validators.required)
  })
  pData:any={}; 
  openEditDailog(obj:any){
    this.pData=obj; 
    console.log(this.pData);
    this.service2.controls['service_Id'].setValue(this.pData.service_Id)
    this.dialog.open(this.EditDailog)
  }

  save2(){
    this.admin.updateServices(this.service2.value)
  }

}

