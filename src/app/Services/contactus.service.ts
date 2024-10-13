import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(public http: HttpClient) { }
  contactElements: any = [];
  WebsiteInfo: any = [];

  getAllContactElements() {
    this.http.get('https://localhost:7004/api/ContactusElement').subscribe(res => {
      this.contactElements = res;
      console.log(this.contactElements); // Ensure data is coming through

    }, err => {
      console.log(err.message);
    })
  }
  getWebsiteInfo() {
    this.http.get('https://localhost:7004/api/WebsiteInformation/GetAllwebsite_information').subscribe(res => {
      this.WebsiteInfo = res;
      console.log(this.WebsiteInfo); // Ensure data is coming through

    }, err => {
      console.log(err.message);
    })
  }
}
