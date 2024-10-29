import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   constructor(public http:HttpClient) { }
   AboutUsElements:any=[];
   selectedAboutus: any = {};
   
   GetAllAboutUsElements(){
  //  debugger;
  this.http.get('https://localhost:7004/api/AboutUs/GetAllAboutUsElements').subscribe((res:any)=>{
  this.AboutUsElements=res; 
   console.log(this.AboutUsElements); 
  },err=>{
   console.log(err.status);
   })
 }
 GetSelectedAboutus() {
  this.http.get('https://localhost:7004/api/AboutUs/GetSelectedAboutus').subscribe(res => {
    this.selectedAboutus = res;
  }, err => {
    console.log(err.message);
  })
}
  

//Trip
Trips:any=[];
  tripDetails:any;

  getALLTrips(){
    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformation/").subscribe(res=>{
      this.Trips=res;
      console.log(this.Trips)

    },err=>{
      console.log(err.message)
    })
  }
  getTripById(id:number){
    const params = new HttpParams().set('id', id.toString());

    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformationById", { params }).subscribe(res=>{
      this.tripDetails=res;
      console.log("ffffff",this.tripDetails)

    },err=>{
      console.log(err.message)
    })
  }



  //Trip Image 
  tripImage:any=[];

  GetTripImageByTripId(id:number){
    this.http.get("https://localhost:7004/api/TripImage/GetTripImageByTripId/"+id).subscribe(res=>{
      this.tripImage=res;
    },err=>{
      console.log(err.message)
    })
  }

  //Service
  tripService:any=[];
  GetServiceByTripId(id:number){
    this.http.get("https://localhost:7004/api/Service/GetServiceByTripId/"+id).subscribe(res=>{
      this.tripService=res;
    },err=>{
      console.log(err.message)
    })
  }

}
