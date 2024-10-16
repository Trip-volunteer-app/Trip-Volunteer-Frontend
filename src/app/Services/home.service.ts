import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   constructor(public http:HttpClient) { }
   AboutUsElements:any=[];
   GetAllAboutUsElements(){
  //  debugger;
  this.http.get('https://localhost:7004/api/AboutUs/GetAllAboutUsElements').subscribe((res:any)=>{
  this.AboutUsElements=res; 
   console.log(this.AboutUsElements); 
  },err=>{
   console.log(err.status);
   })
 }
  


}
