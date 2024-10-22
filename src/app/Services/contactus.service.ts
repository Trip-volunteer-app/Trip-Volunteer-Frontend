import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(public http: HttpClient) { }
  contactElements: any = [];
  WebsiteInfo: any = [];
  contactElementsKeys: any = [];
  WebsiteInfoKeys: any = [];
  selectedContactElements: any ={};

  getAllContactElements() {
    this.http.get('https://localhost:7004/api/ContactusElement').subscribe(res => {
      this.contactElements = res;
      this.contactElementsKeys = Object.keys(this.contactElements[0]);
      console.log(this.contactElements);
    }, err => {
      console.log(err.message);
    })
  }

  GetSelectedElement() {
    this.http.get('https://localhost:7004/api/ContactusElement/GetSelectedElement').subscribe(res => {
      this.selectedContactElements = res;
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
    console.log('dddddddddddddddddddddddddddddd',id)
    this.http.delete(`https://localhost:7004/api/ContactusElement/DeleteContactusElement?id=${id}`)
    .subscribe(
      () => {
        console.log('Deleted successfully');
      },
      err => {
        console.error('Error occurred', err);
      }
    );
  
  }
  deleteWebsiteInfo(id:number){
    this.http.delete('https://localhost:7004/api/WebsiteInformation/Deletewebsite_information/' + id).subscribe(response=>{
      console.log('deleted')},
    err=>{
      console.log('errer');
    })
    window.location.reload();
  }

  createContactUsElements(body:any){
    body.image1 = this.imageStorage['image1'];
    body.hero_Img = this.imageStorage['hero_Img'];
    console.log(body);
    this.http.post('https://localhost:7004/api/ContactusElement/CreateContactusElement/', body).subscribe(response=>{
      console.log('created')},
    err=>{
      console.log('errer');
    })
  }

  createWebsiteInfo(body:any){
    this.http.post('https://localhost:7004/api/WebsiteInformation/CREATEwebsite_information/', body).subscribe(response=>{
      console.log('created')},
    err=>{
      console.log('errer');
    })
    window.location.reload();
  }

  UpdateSelectedElement(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.put(
      'https://localhost:7004/api/ContactusElement/UpdateSelectedElement', 
      {}, // Empty body as you're sending the id in query parameters
      { params } // Add the parameters here
    ).subscribe(
      response => {
        console.log('Updated successfully');
      },
      err => {
        console.error('Error occurred', err);
      }
    );
  }

  UpdateSelectedWebsiteInfo(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.put(
      'https://localhost:7004/api/WebsiteInformation/UpdateSelectedWebsiteInfo', 
      {}, // Empty body as you're sending the id in query parameters
      { params } // Add the parameters here
    ).subscribe(
      response => {
        console.log('Updated successfully');
      },
      err => {
        console.error('Error occurred', err);
      }
    );
  }

  GetSelectedWebsiteInfo() {
    this.http.get('https://localhost:7004/api/WebsiteInformation/GetSelectedWebsiteInfo').subscribe(res => {
      this.selectedContactElements = res;
    }, err => {
      console.log(err.message);
    })
  }

  imageStorage: { [key: string]: any } = {};
  UploadAttachment(file: FormData, apiPath: string, imgNumber: string) {
    this.http.post(`https://localhost:7004/api/ContactusElement/${apiPath}`, file).subscribe(
      (response: any) => {
        console.log('Upload successful', response);
        this.imageStorage[imgNumber] = response[imgNumber];
      },
      (err) => {
        console.error('Error occurred', err);
      }
    );
  }
  UpdateContact(body:any){
    body.image1 = this.imageStorage['image1'];
    body.hero_Img = this.imageStorage['hero_Img'];
    this.http.put(
      'https://localhost:7004/api/ContactusElement/UpdateContactusElement',body
    ).subscribe(
      response => {
        console.log('Updated successfully');
      },
      err => {
        console.error('Error occurred', err);
      }
    );
  }


}
