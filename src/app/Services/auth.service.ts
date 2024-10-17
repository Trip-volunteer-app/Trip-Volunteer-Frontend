import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  Register(registerData: any) {
    const params = new HttpParams()
      .set('FirstName', registerData.FIRST_NAME)
      .set('LastName', registerData.LAST_NAME)
      .set('Email', registerData.EMAIL)
      .set('Password', registerData.PASSWORD)
      .set('RePassword', registerData.REPASSWORD);
  
    this.http.post('https://localhost:7004/api/UserLogin/Registers', {}, { params })
      .subscribe(
        (resp) => {
          console.log('User registered successfully', resp);
        },
        (err) => {
          console.error('Error registering user', err);
        }
      );
  }
}




