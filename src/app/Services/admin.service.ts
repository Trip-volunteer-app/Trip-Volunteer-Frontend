import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';  
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  
public pieChartLabels: string[] = ['Accepted', 'Pending', 'Rejected'];
public pieChartData: number[] = [];
public pieChartType = 'pie';


  constructor(public http:HttpClient,public toastr: ToastrService) { }

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





//All Users Informations
AllUsers:any=[]; 
GetAllUsersData(){ 
 this.http.get('https://localhost:7004/api/UserLogin/GetAllUserInformation').subscribe(result=>{
this.AllUsers =result ;  
},err=>{
      console.log(err.message);     
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
  body.image_Name=this.displayImage;
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
// GetAllAnuualReport2(): Observable<any[]> {
//   return this.http.get<any[]>('https://localhost:7004/api/Annual/AnnualReport');
// }





//UserData
getUserData(email: string): Observable<any> {
  return this.http.get(`https://localhost:7004/api/UserLogin/GetUserinfoByEmail?email=${email}`);
}



// updateUserData(updatedData: any): Observable<any> {
//   return this.http.put('https://localhost:7004/api/UserLogin/UpdateAllUserInformation', updatedData);
// }


updateUserData(updatedData: any) {
  const params = new HttpParams()
    .set('L_Email', updatedData.email)
    .set('L_Pass', updatedData.password)
    .set('L_RePass', updatedData.repassword)
    .set('r_id', updatedData.role_Id)
    .set('u_id', updatedData.user_Id)
    .set('F_Name', updatedData.first_Name)
    .set('L_Name', updatedData.last_Name)
    .set('IMG', this.display_Image1) 
    .set('u_Address', updatedData.address) 
    .set('phone', updatedData.phone_Number)
    .set('L_id', updatedData.login_Id) 
    .set('B_Day', updatedData.birth_Date);


  this.http.put('https://localhost:7004/api/UserLogin/UpdateAllUserInformation', {}, { params })
    .subscribe(
      result => {
        console.log(params);
        console.log("User data updated successfully", result);
        // window.location.reload();
        this.toastr.success('successfly update profile');
      },
      error => {
        console.log(params);
        
        console.error("Error updating user data", error.message);     
      }
    );
}

display_Image1 :any ; 
uploadUserImage(file: FormData) {
  this.http.put('https://localhost:7004/api/Users/uploadImage', file).subscribe((resp:any)=>{  
    console.log('uploadUserImage',resp);
    
    this.display_Image1=resp.imagename;
  },err=>{
    
    console.log('Error');
    
  })
}
getTripDetails(tripId: number): Observable<any> {
  return this.http.get(`https://localhost:7004/api/Trips/GetTripById/${tripId}`);
}
private  apiUrl = 'https://localhost:7004/api';
sendTripDetailsEmail(emailData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(`${this.apiUrl}/Volunteers/sendTripDetailsEmail`, emailData, { headers });
}


// sendTripDetailsEmail(emailData: any): Observable<any> {
//   return this.http.post('https://localhost:7004/api/Volunteers/sendTripDetailsEmail', emailData);
// }

changePassword(payload: any) {
  this.http.put('https://localhost:7004/api/UserLogin/ChangePassword', payload)
    .subscribe(
      result => {
        console.log("Change Password successfully", result);
        window.location.reload();
        this.toastr.success('Change Password successfully ');
      },
      error => {
        
        
        console.error("Error Changed Password", error.message);     
      }
    );
}


//Testimonial
Testimonial:any=[];
getALLTestimonial() {
  this.http.get("https://localhost:7004/api/Testimonial/GetAllTestimonies").subscribe(
    res => {
      this.Testimonial = res;
      console.log(this.Testimonial);
    },
    err => {
      console.log(err.message);
    }
  );
}



DeleteTestimonial(id:number){
  this.http.delete('https://localhost:7004/api/Testimonial/DeleteTestimony/'+id).subscribe(resp=>{
    console.log('the Testimonial deleted');
    window.location.reload();
  },err=>{
    console.log('Error',err.message);   
  })
  } 

  

  updateTestimonial(body:any){
    this.http.put('https://localhost:7004/api/Testimonial/UpdateTestimony',body).subscribe((resp)=>{
      console.log('the Testimonial Updated');  
    },err=>{
      console.log('error');
    })}



  GetVolunteerUserInfoByTripId:any={};
  GetVolunteerUserInfoByTripId1(trip_Id:number){
    this.http.get('https://localhost:7004/api/Trips/GetVolunteerUserInfoByTripId/'+trip_Id).subscribe(result=>{
      this.GetVolunteerUserInfoByTripId =result ;  
      console.log(result);
      },err=>{
            console.log('errrrrrrrrrrrrror',err.message);     
      })
  }


  GetUserPaymentsForTrip:any={};
  GetUserPaymentsForTrip1(trip_Id:number){
    this.http.get('https://localhost:7004/api/Trips/GetUserPaymentsForTrip/'+trip_Id).subscribe(result=>{
      this.GetUserPaymentsForTrip =result ;  
      console.log(result);
      },err=>{
            console.log('errrrrrrrrrrrrror',err.message);     
      })
  }





  
}









