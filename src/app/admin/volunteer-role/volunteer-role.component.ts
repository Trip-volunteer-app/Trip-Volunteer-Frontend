import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer-role',
  templateUrl: './volunteer-role.component.html',
  styleUrls: ['./volunteer-role.component.css']
})
export class VolunteerRoleComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  


  constructor(public admin:AdminService,public dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.admin.getAllVolunteerRole();
  }

  VolunteerRole:FormGroup = new FormGroup({
    role_Name:new FormControl('',Validators.required)
  })

  openCreateDialog() {
    this.dialog.open(this.CreateDailog)  
  }


  save(){
  this.admin.CreateVolunteerRole(this.VolunteerRole.value)
  }


  openDeleteDialog(id:number){
    //open ng-template (callDeleteDailog) 
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result!=undefined){
      if(result=='yes')
        this.admin.DeleteVolunteerRole(id);
      else if(result=='no')
        console.log('Thank you ');
        
    }
  })

  }

  VolunteerRole2:FormGroup = new FormGroup({
    volunteer_Role_Id:new FormControl('',Validators.required),
    role_Name:new FormControl('',Validators.required)
  })
  pData:any={}; 
  openEditDailog(obj:any){
    this.pData=obj; 
    console.log(this.pData);
    this.VolunteerRole2.controls['volunteer_Role_Id'].setValue(this.pData.volunteer_Role_Id)
    this.dialog.open(this.EditDailog)
  }

  save2(){
    this.admin.updateVolunteerRole(this.VolunteerRole2.value)
  }

}

