import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(public http:HttpClient) { }
  Trips:any=[];
  tripDetails:any={};
  selectedTrip:any;

  getALLTrips(){
    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformation/").subscribe(res=>{
      this.Trips=res;
      console.log(res)

    },err=>{
      console.log(err.message)
    })
  }
  getTripById(id:number){
    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformationById/"+id).subscribe(res=>{
      this.tripDetails=res;
    },err=>{
      console.log(err.message)
    })
  }
  DeleteTrip(id:number){
    this.http.delete("https://localhost:7004/api/Trips/Deletetrips/"+id).subscribe(res=>{
      console.log("the trip delete")
    },err=>{
      console.log("Error")
    })
    window.location.reload();
  }
}
