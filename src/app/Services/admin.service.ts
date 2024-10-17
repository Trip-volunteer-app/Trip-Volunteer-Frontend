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
this.http.put('https://localhost:7004/api/categories/UpdateService',body).subscribe((resp)=>{
  console.log('Updated');  
},err=>{
  console.log('error');
})}




}