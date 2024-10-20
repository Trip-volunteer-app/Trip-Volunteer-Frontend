import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }

// Categories
  Categories:any=[]; 
  getAllCategories(){ 
   this.http.get('https://localhost:7004/api/categories/GetAllcategories').subscribe(result=>{
  this.Categories =result ;  
  },err=>{
        console.log(err.message);     
})}


CreateCategories(body:any){
  this.http.post('https://localhost:7004/api/categories/CREATEcategories',body).subscribe((resp)=>{
    console.log('the Categories created');
    window.location.reload();
  },err=>{
    console.log('Error');
    window.location.reload();
  })
}


DeleteCategories(id:number){
  this.http.delete('https://localhost:7004/api/categories/Deletecategories/'+id).subscribe(resp=>{
    console.log('the Categories deleted');
  },err=>{
    console.log('Error');   
  })
  window.location.reload();
 } 


 updateCategories(body:any){
  this.http.put('https://localhost:7004/api/categories/UPDATEcategories',body).subscribe((resp)=>{
    console.log('Updated');  
  },err=>{
    console.log('error');
})}






// Services
Services:any=[]; 
getAllServices(){ 
 this.http.get('https://localhost:7004/api/Service').subscribe(result=>{
this.Services =result ;  
},err=>{
      console.log(err.message);     
})}


CreateServices(body:any){
this.http.post('https://localhost:7004/api/Service/CreateService',body).subscribe((resp)=>{
  console.log('the Services created');
  window.location.reload();
},err=>{
  console.log('Error');
  window.location.reload();
})
}


DeleteServices(id:number){
this.http.delete('https://localhost:7004/api/Service/DeleteService/'+id).subscribe(resp=>{
  console.log('the Services deleted');
},err=>{
  console.log('Error');   
})
window.location.reload();
} 


updateServices(body:any){
this.http.put('https://localhost:7004/api/Service/UpdateService',body).subscribe((resp)=>{
  console.log('Updated');  
},err=>{
  console.log('error');
})}


//Trip


Trip:any=[]; 
TripById:any={};

GetAllTrips(){ 
 this.http.get('https://localhost:7004/api/Trips/GetAllTripInformation').subscribe(result=>{
this.Trip =result ;  
},err=>{
      console.log(err.message);     
})}

GetTripById(id:number){
  this.http.get('https://localhost:7004/api/Trips/GetTripById/'+ id).subscribe(result=>{
    this.TripById =result ;  
    },err=>{
          console.log(err.message);     
    })
}
CreateTrip(body:any){
this.http.post('https://localhost:7004/api/Trips/CreateTrip',body).subscribe((resp)=>{
  console.log('the Trip Added');
  window.location.reload();
},err=>{
  console.log('Error');
  window.location.reload();
})
}


DeleteTrip(id:number){
this.http.delete('https://localhost:7004/api/Trips/DeleteTrip/'+id).subscribe(resp=>{
  console.log('the Trip deleted');
  window.location.reload();
},err=>{
  console.log('Error');   
  window.location.reload();
})
} 


UpdateTrip(body:any){
this.http.put('https://localhost:7004/api/Trips/UpdateTrip',body).subscribe((resp)=>{
  console.log('Updated');  
},err=>{
  console.log('error');
})}


//Trip Images
TripImage:any=[]; 

GetTripImageByTripId(id:number){ 
  this.http.get('https://localhost:7004/api/TripImage/GetTripImageByTripId/'+ id).subscribe(result=>{
 this.TripImage =result ;  
 },err=>{
       console.log(err.message);     
 })}

CreateTripImage(body:any){
this.http.post('https://localhost:7004/api/TripImage/CreateTripImage',body).subscribe((resp)=>{
  console.log('the Trip Image Added');
  window.location.reload();
},err=>{
  console.log('Error');
  window.location.reload();
})
}


DeleteTripImage(id:number){
this.http.delete('https://localhost:7004/api/TripImage/DeleteTripImage/'+id).subscribe(resp=>{
  console.log('the Trip Image deleted');
  window.location.reload();
},err=>{
  console.log('Error',err.message);   
})
} 


updateTripImage(body:any){
this.http.put('https://localhost:7004/api/TripImage/UpdateTripImage',body).subscribe((resp)=>{
  console.log('Updated');  
  window.location.reload();
},err=>{
  console.log('error');
  window.location.reload();
})}


}