import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ContactusService {
  constructor(public http: HttpClient, private toastr: ToastrService) { }
  contactElements: any = [];
  WebsiteInfo: any = [];
  contactElementsKeys: any = [];
  WebsiteInfoKeys: any = [];
  selectedContactElements: any ={};
  selectedWebsiteInfo: any ={};


  getAllContactElements() {
    this.http.get('https://localhost:7004/api/ContactusElement').subscribe(res => {
      this.contactElements = res;
      this.contactElementsKeys = Object.keys(this.contactElements[0]);
      console.log(this.contactElements);
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

  async GetSelectedElement(): Promise<void> {
    try {
    const res = await this.http.get('https://localhost:7004/api/ContactusElement/GetSelectedElement').toPromise();
      this.selectedContactElements = res;
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }

  async GetSelectedWebsiteInfo() {
    try {
    const res = await this.http.get('https://localhost:7004/api/WebsiteInformation/GetSelectedWebsiteInfo').toPromise();
      this.selectedWebsiteInfo = res;
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }

  deleteContactUsElements(id:number){
    this.http.delete(`https://localhost:7004/api/ContactusElement/DeleteContactusElement?id=${id}`)
    .subscribe(
      () => {
        Swal.fire({
                  icon: 'success',
                  title: 'Deleted!',
                  text: 'The Contact Us element has been deleted successfully.',
                  showConfirmButton: false,
                  timer: 2000
                });
        console.log('Deleted successfully');
        this.getAllContactElements();      
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred', err);
      }
    );
  }

  deleteWebsiteInfo(id:number){
    this.http.delete('https://localhost:7004/api/WebsiteInformation/Deletewebsite_information/' + id).subscribe(response=>{
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Website Info has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      console.log('deleted')},
    err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Website Info. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('errer');
    })
  }

  createContactUsElements(body:any){
    body.image1 = this.imageStorage['image1'];
    body.hero_Img = this.imageStorage['hero_Img'];
    console.log(body);
    this.http.post('https://localhost:7004/api/ContactusElement/CreateContactusElement/', body).subscribe(response=>{
      Swal.fire({
        icon: 'success',
        title: 'create!',
        text: 'The Contact Us element has been created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      console.log('created')
      this.getAllContactElements();
    },
    err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while create the ContactUs Elements. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('errer');
    })
  }

  createWebsiteInfo(body:any){
    this.http.post('https://localhost:7004/api/WebsiteInformation/CREATEwebsite_information/', body).subscribe(response=>{
      
      Swal.fire({
        icon: 'success',
        title: 'create!',
        text: 'The Website Info element has been creted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllContactElements();
      console.log('created')},
    err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while create the element. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('errer');
    })
  }

  UpdateSelectedElement(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.put(
      'https://localhost:7004/api/ContactusElement/UpdateSelectedElement', 
      {},
      { params }
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
      {},
      { params }
    ).subscribe(
      response => {
        console.log('Updated successfully');
      },
      err => {
        console.error('Error occurred', err);
      }
    );
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
        Swal.fire({
          icon: 'success',
          title: 'Update',
          text: 'The contact element has been updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllContactElements();
        console.log('Updated successfully');
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while updated the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred', err);
      }
    );
  }

  UpdateWebsiteInfo(body:any){
    this.http.put(
      'https://localhost:7004/api/WebsiteInformation/UPDATEwebsite_information',body
    ).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Update',
          text: 'The website info has been updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        console.log('Updated successfully');
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while updated the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred', err);
      }
    );
  }


createContactForm(body: any) {
  this.http.post('https://localhost:7004/api/ContactU/CreateContact/', body).subscribe(
    (response) => {
      console.log('created');    
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Message sent successfully!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    },
    (err) => {
      console.log('error');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send message. Please try again.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Retry'
      });
    }
  );
}


  // Update the service method to receive email data correctly
sendEmailContact(email: any): Observable<any> {
  return this.http.post('https://localhost:7004/api/ContactU/send-email', { email }); 
}
}
