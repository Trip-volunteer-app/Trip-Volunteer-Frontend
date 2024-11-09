import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient,private router:Router,private toastr:ToastrService) { }

  

  Register(registerData: any) {
    const params = new HttpParams()
      .set('First_Name', registerData.FIRST_NAME )
      .set('Last_Name', registerData.LAST_NAME)
      .set('Email', registerData.EMAIL)
      .set('Password', registerData.PASSWORD)
      .set('RePassword', registerData.REPASSWORD)
      .set('ADDRESS', registerData.Address)
      .set('PHONE_NUMBER', registerData.PhoneNumber);
  
    this.http.post('https://localhost:7004/api/UserLogin/Registers', {}, { params })
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp && resp.success) {
            Swal.fire({
              icon: 'success',
              title: 'Register!',
              text: 'The Registers has been successfully! Login to you account now.',
              showConfirmButton: false,
              timer: 2000
            });
            this.router.navigate(['security/login']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'An error occurred while Registers!. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        },
        (err) => {
          if (err.status === 400 && err.error === 'Email already exists') {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Email already exists. Please use a different email.',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'An error occurred during registration. Please try again.',
              confirmButtonText: 'OK'
            });
            console.error('Error registering user', err);
          }
        }
      );
  }
  
  

  updatePassword(email: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });
  
    const payload = {
      email: email,
      newPassword: newPassword
    };
  
    return this.http.put('https://localhost:7004/api/UserLogin/updatePassword', payload, { headers });
  }
  

  login(email:any, password:any){
    var body ={
      email : email.toString(),
      password: password.toString(),
      repassword:password.toString()

      }
      console.log("body",body);
      const headerDirc= {
      'Content-Type':'application/json',
      'Accept':'application/json'
      }
      
      const requestOptions={
      headers:new HttpHeaders(headerDirc)
    }
    
    console.log('body',body);
    console.log('requestOptions',requestOptions);


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
      }
      else if(data.Roleid=="2")
      {
      this.toastr.success('Welcome On User Page');
      this.router.navigate(['home']);
      }
      else
      {
        this.toastr.error('error in role id');
      }
    },err=>{
        console.log(err);
        this.toastr.error('Something wrong!!');
        this.toastr.error(err.message);
        })
  }
}




