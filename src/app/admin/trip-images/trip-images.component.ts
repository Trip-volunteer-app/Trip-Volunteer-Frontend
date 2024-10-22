import { Component, OnInit,ViewChild,TemplateRef, Input } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trip-images',
  templateUrl: './trip-images.component.html',
  styleUrls: ['./trip-images.component.css']
})
export class TripImagesComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  
  tripId!: number;

  constructor(public admin:AdminService,public dialog: MatDialog, private route: ActivatedRoute,private router:Router)
  {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('tripId')!;
      console.log("TripId:", this.tripId);
      if (this.tripId) {
        this.admin.GetTripImageByTripId(this.tripId);
      }
    });
  }
   

  TripImage:FormGroup = new FormGroup({
    image_Name:new FormControl('',Validators.required),
    trip_Id:new FormControl(),


  })

  uploadImage(file:any){
    if(file.length==0)
      return;
    let fileToUpload=<File>file[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name)
    this.admin.uploadTripImage(formData);
  }
  openCreateDialog(id:number) {
    this.TripImage.controls['trip_Id'].setValue(id)

    this.dialog.open(this.CreateDailog)  
  }


  save(){
    
  this.admin.CreateTripImage(this.TripImage.value)
  }
  return(){
    this.router.navigate(['admin/TripsInformation']);
  }
  back(id:number){
    this.router.navigate(['admin/ManageTrips/', id]);

  }
  openDeleteDialog(id:number){
    console.log(id)
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result != undefined){
      if(result == 'yes')
        this.admin.DeleteTripImage(id);
      else if(result == 'no')
        console.log('Thank you ');
        
    }
  })
  }

  UpdateImage:FormGroup = new FormGroup({
    trip_Image_Id:new FormControl(),
    image_Name:new FormControl('',Validators.required),
    trip_Id:new FormControl(),


  })
  pData:any;
  openEditDailog(obj:any){
    this.pData=obj; 
    console.log(this.pData);
    this.UpdateImage.controls['trip_Image_Id'].setValue(this.pData.trip_Image_Id)
    this.UpdateImage.controls['trip_Id'].setValue(this.pData.trip_Id)
    this.dialog.open(this.EditDailog)
  }

  save2(){
    console.log(this.UpdateImage.value);

    this.admin.updateTripImage(this.UpdateImage.value)
  }
}
