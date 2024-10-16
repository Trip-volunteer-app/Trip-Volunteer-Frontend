import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }


  Register(registerData: any) {
    // const userInfo = {
      
    //   FIRSTNAME: registerData.FIRST_NAME,
    //   LASTNAME: registerData.LAST_NAME,
    //   EMAIL: registerData.EMAIL,
    //   PASSWORD:registerData.PASSWORD,
    //   REPASSWORD:registerData.REPASSWORD,
    // };

    return this.http.post('https://localhost:7004/api/UserLogin/Registers', registerData).subscribe(
      (resp) => {
        console.log(resp);
        console.log("User registered successfully");
      },
      (err) => {
        console.log('Error registering user', err);
      }
    );
  }



  

}




