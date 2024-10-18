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
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  


  constructor(public admin:AdminService,public dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.admin.getAllReview();
  }



  openDeleteDialog(id:number){
    //open ng-template (callDeleteDailog) 
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result!=undefined){
      if(result=='yes')
        this.admin.DeleteReview(id);
      else if(result=='no')
        console.log('Thank you ');
        
    }
  })

  }



}

