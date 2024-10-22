import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  
public pieChartLabels: string[] = ['Accepted', 'Pending', 'Rejected'];
public pieChartData: number[] = [];
public pieChartType = 'pie';


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







// VolunteerRole
VolunteerRole:any=[]; 
getAllVolunteerRole(){ 
 this.http.get('https://localhost:7004/api/VolunteerRoles/GetAllVolunteerRoles').subscribe(result=>{
this.VolunteerRole =result ;  
},err=>{
      console.log(err.message);     
})}


CreateVolunteerRole(body:any){
this.http.post('https://localhost:7004/api/VolunteerRoles/CreateVolunteerRole',body).subscribe((resp)=>{
  console.log('the Volunteer Role created');
  window.location.reload();
},err=>{
  console.log('Error');
  window.location.reload();
})
}


DeleteVolunteerRole(id:number){
this.http.delete('https://localhost:7004/api/VolunteerRoles/DeleteVolunteerRole/'+id).subscribe(resp=>{
  console.log('the Volunteer Role deleted');
},err=>{
  console.log('Error');   
})
window.location.reload();
} 


updateVolunteerRole(body:any){
this.http.put('https://localhost:7004/api/VolunteerRoles/UpdateVolunteerRole',body).subscribe((resp)=>{
  console.log('the Volunteer Role Updated');  
},err=>{
  console.log('error');
})}





// Volunteer
Volunteer:any=[]; 
getAllVolunteer(){ 
 this.http.get('https://localhost:7004/api/Volunteers/GetAllVolunteers').subscribe(result=>{
this.Volunteer =result ;  
},err=>{
      console.log(err.message);     
})}



DeleteVolunteer(id:number){
this.http.delete('https://localhost:7004/api/Volunteers/DeleteVolunteer/'+id).subscribe(resp=>{
  console.log('the Volunteer deleted');
},err=>{
  console.log('Error');   
})
window.location.reload();
} 


updateVolunteer(volunteer: any): Observable<any> {
  return this.http.put('https://localhost:7004/api/Volunteers/UpdateVolunteer', volunteer);  // Ensure this returns an observable
}

// Return an observable for sending email
sendEmail(emailData: any): Observable<any> {
  return this.http.post('https://localhost:7004/api/Volunteers/send-email', emailData);  // Ensure this returns an observable
}





// Trip Services
TripServices:any=[]; 
getAllTripServices(){ 
 this.http.get('https://localhost:7004/api/serviceTripe/GetAllTripServices').subscribe(result=>{
this.TripServices =result ;  
},err=>{
      console.log(err.message);     
})}


CreateTripServices(body:any){
this.http.post('https://localhost:7004/api/serviceTripe/CreateTripService',body).subscribe((resp)=>{
  console.log('the Trip Services created');
  window.location.reload();
},err=>{
  console.log('Error');
  window.location.reload();
})
}


DeleteTripServices(id:number){
  console.log('open admin');
this.http.delete('https://localhost:7004/api/serviceTripe/DeleteTripService/'+id).subscribe(resp=>{
  console.log('in resp');
  console.log('the Trip Services deleted');
},err=>{
  console.log('in err');
  console.log('Error');   
})
// window.location.reload();
} 


updateTripServices(body:any){
this.http.put('https://localhost:7004/api/serviceTripe/UpdateTripService',body).subscribe((resp)=>{
  console.log('the Trip Services Updated');  
},err=>{
  console.log('error');
})}









// Review
Review:any=[]; 
getAllReview(){ 
 this.http.get('https://localhost:7004/api/Review').subscribe(result=>{
this.Review =result ;  
},err=>{
      console.log(err.message);     
})}


DeleteReview(id:number){ 
this.http.delete('https://localhost:7004/api/Review/DeleteReview'+id).subscribe(resp=>{
  console.log('the Review deleted');
},err=>{
  console.log('Error');   
})
window.location.reload();
} 









// Trip Volunteer Role
TripVolunteerRole:any=[]; 
getAllTripVolunteerRole(){ 
 this.http.get('https://localhost:7004/api/ITripVolunteerrole/GetAlltrip_volunteerRoles').subscribe(result=>{
this.TripVolunteerRole =result ;  
},err=>{
      console.log(err.message);     
})}


CreateTripVolunteerRole(body:any){
this.http.post('https://localhost:7004/api/ITripVolunteerrole/CREATEtrip_volunteerRoles',body).subscribe((resp)=>{
  console.log('the Trip Volunteer Role created');
  // window.location.reload();
},err=>{
  console.log('Error');
  // window.location.reload();
})
}


DeleteTripVolunteerRole(id:number){
this.http.delete('https://localhost:7004/api/ITripVolunteerrole/Deletetrip_volunteerRoles/'+id).subscribe(resp=>{
  console.log('the Trip Volunteer Role deleted');
},err=>{
  console.log('Error');   
})
window.location.reload();
} 


updateTripVolunteerRole(body:any){
this.http.put('https://localhost:7004/api/ITripVolunteerrole/UPDATEtrip_volunteerRoles',body).subscribe((resp)=>{
  console.log('the Trip Volunteer Role Updated');  

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
displayImage:any;
GetTripImageByTripId(id:number){ 
  this.http.get('https://localhost:7004/api/TripImage/GetTripImageByTripId/'+ id).subscribe(result=>{
 this.TripImage =result ;  
 },err=>{
       console.log(err.message);     
 })}

CreateTripImage(body:any){
  body.image_Name=this.displayImage;
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
  body.image_Name=this.displayImage;
this.http.put('https://localhost:7004/api/TripImage/UpdateTripImage',body).subscribe((resp)=>{
  console.log('Updated');  
  window.location.reload();
},err=>{
  console.log('error');
})}

uploadTripImage(file:FormData){
this.http.post('https://localhost:7004/api/TripImage/uploadImage',file).subscribe((res:any)=>{
this.displayImage=res.image_Name;
},err=>{
  console.log('error');
})

}



//Static Number

NumberOfRegisteredUsers(): Observable<number> {
  return this.http.get<number>('https://localhost:7004/api/Users/trips/NumberOfRegisteredUsers');
}

NumberOfTrips(): Observable<number> {
  return this.http.get<number>('https://localhost:7004/api/Trips/trips/GetNumberOfTrips');
}


NumberOfFinishedTrips(): Observable<number> {
  return this.http.get<number>('https://localhost:7004/api/Trips/trips/NumberOfFinishedTrips');
}



TripsWithMaxReservations:any=[]; 
GetAllTripsWithMaxReservations(){ 
 this.http.get('https://localhost:7004/api/Trips/TripsWithMaxReservations').subscribe(result=>{
this.TripsWithMaxReservations =result ;  
},err=>{
      console.log(err.message);     
})}


TotalNumberOfVolunteer(): Observable<number> {
  return this.http.get<number>('https://localhost:7004/api/Volunteers/TotalNumberOfVolunteer');
}


TotalNumberOfPayments(): Observable<number> {
  return this.http.get<number>('https://localhost:7004/api/Payment/TotalNumberOfPayments');
}






//Reports
//Monthly Report
MonthlyReport:any=[]; 
GetAllMonthlyReport(){ 
 this.http.get('https://localhost:7004/api/MonthlyReport/MonthlyReport').subscribe(result=>{
this.MonthlyReport =result ;  
console.log(result);
},err=>{
      console.log(err.message);     
})}



//Anuual Report
AnuualReport:any=[]; 
GetAllAnuualReport(){ 
 this.http.get('https://localhost:7004/api/Annual/AnnualReport').subscribe(result=>{
this.AnuualReport =result ;  
},err=>{
      console.log(err.message);     
})}







//Charts














}