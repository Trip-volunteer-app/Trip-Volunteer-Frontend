import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }


  Register(registerData: any) {
    // debugger;
    console.log('Auth-registerData:'+registerData)

     this.http.post('https://localhost:7004/api/UserLogin/Registers', registerData).subscribe(
      (resp) => {
        console.log(resp);
        console.log("User registered successfully");
      },
      (err) => {
        console.log('Auth Error Data'+registerData);
        console.log('Error registering user', err);
      }
    );
  }



  

}




