import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(public http: HttpClient) { }
  contactElements: any = [];
  WebsiteInfo: any = [];
  contactElementsKeys: any = [];
  WebsiteInfoKeys: any = [];

  getAllContactElements() {
    this.http.get('https://localhost:7004/api/ContactusElement').subscribe(res => {
      this.contactElements = res;
      this.contactElementsKeys = Object.keys(this.contactElements[0]);
    }, err => {
      console.log(err.message);
    })
  }

  getWebsiteInfo() {
    this.http.get('https://localhost:7004/api/WebsiteInformation/GetAllwebsite_information').subscribe(res => {
      this.WebsiteInfo = res;
      this.WebsiteInfoKeys = Object.keys(this.WebsiteInfo[0]);
    }, err => {
      console.log(err.message);
    })
  }

  deleteContactUsElements(id:number){
    this.http.delete('https://localhost:7004/api/ContactusElement/DeleteContactusElement/'+ id).subscribe(response=>{
      console.log('deleted')},
    err=>{
      console.log('errer');
    })
  }
  deleteWebsiteInfo(id:number){
    this.http.delete('https://localhost:7004/api/WebsiteInformation/Deletewebsite_information/'+id).subscribe(response=>{
      console.log('deleted')},
    err=>{
      console.log('errer');
    })
  }
}
