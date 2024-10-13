import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(public http:HttpClient) { }
  trips:any=[];
  getALLTrips(){
    this.http.get("https://localhost:7004/api/Trips/GetAlltrips/").subscribe(res=>{
      this.trips=res;
    },err=>{
      console.log(err.message)
    })
  }
  DeleteTrip(id:number){
    this.http.delete("https://localhost:7004/api/Deletetrips/{id}"+id).subscribe(res=>{
      console.log("the trip delete")
    },err=>{
      console.log("Error")
    })
  }
}
