import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient,private router:Router,private toastr:ToastrService) { }
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

  login(email:any, password:any){
    var body ={
      email : email.toString(),
      password: password.toString()
      }
      console.log("body",body)
      const headerDirc= {
      'Content-Type':'application/json',
      'Accept':'application/json'
      }
      
      const requestOptions={
      headers:new HttpHeaders(headerDirc)
    }
    this.http.post('https://localhost:7004/api/UserLogin/Auth',body,requestOptions).subscribe((resp:any)=>{
      console.log(resp);
      const responce = {
      token : resp.toString() 
      }
      

      localStorage.setItem('token',responce.token);
      let data:any = jwtDecode(responce.token)
      localStorage.setItem('user',JSON.stringify(data))
      console.log(data.Roleid);
      if(data.Roleid=="1")
      {
      this.toastr.success('Welcome On Admin Dashbaord');
      this.router.navigate(['admin/dashboard']);
      }else if(data.Roleid=="2")
      {
      this.toastr.success('Welcome On User Page');
      this.router.navigate(['home']);
      }},err=>{
        console.log(err);
        this.toastr.error('Something wrong!!');
        this.toastr.error(err.message);
        })
  }
}




