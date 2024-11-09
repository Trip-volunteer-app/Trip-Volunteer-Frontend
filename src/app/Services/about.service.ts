import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(public http: HttpClient) { }
  selectedAboutus: any = {};
  AboutUsElements: any = [];

  GetAllAboutUsElements() {
    //  debugger;
    this.http.get('https://localhost:7004/api/AboutUs/GetAllAboutUsElements').subscribe((res: any) => {
      this.AboutUsElements = res;
      console.log(this.AboutUsElements);
    }, err => {
      console.log(err.status);
    })
  }

  async GetSelectedAboutus(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/AboutUs/GetSelectedAboutus`).toPromise();
      this.selectedAboutus = res; // Assign the response
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
  
  DeleteAboutUsElements(id: number) {
    this.http.delete('https://localhost:7004/api/AboutUs/DeleteAboutUsElements/' + id).subscribe(
      response => {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The About Us element has been deleted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetAllAboutUsElements();
      },
      err => {
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error:', err);
      }
    );
  }

  // DeleteAboutUsElements(id: number) {
  //   this.http.delete('https://localhost:7004/api/AboutUs/DeleteAboutUsElements/' + id).subscribe(response => {
  //     this.GetAllAboutUsElements();
  //     console.log('deleted')
  //   },
  //     err => {
  //       console.log('errer');
  //     })
  // }

  CreateAboutUsElements(body: any) {
    body.hero_image = this.imageStorage['hero_image'];
    body.image1 = this.imageStorage['image1'];
    body.image2 = this.imageStorage['image2'];
    body.image3 = this.imageStorage['image3'];
    body.image4 = this.imageStorage['image4'];
    body.image5 = this.imageStorage['image5'];
    body.image6 = this.imageStorage['image6'];
  
    console.log('Final Body:', body);
    this.http.post('https://localhost:7004/api/AboutUs/CreateAboutUsElements/', body).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Create!',
          text: 'The About Us element has been created successfully.',
          showConfirmButton: false,
          timer: 2000
        });

        this.GetAllAboutUsElements();
        console.log('Created successfully');
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Created the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred while creating', err);
      }
    );
  }
  

  UpdateSelectedAboutus(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.put('https://localhost:7004/api/AboutUs/UpdateSelectedAboutus',
      {}, // Empty body as you're sending the id in query parameters
      { params } // Add the parameters here
    ).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Update Selected Aboutus!',
          text: 'The About Us element has been selected successfully.',
          showConfirmButton: false,
          timer: 2000
        });


        this.GetAllAboutUsElements();
        console.log('Updated successfully');
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Selected the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred', err);
      }
    );
  }

  UpdateAbout(body:any){
    body.hero_image = this.imageStorage['hero_image'];
    body.image1 = this.imageStorage['image1'];
    body.image2 = this.imageStorage['image2'];
    body.image3 = this.imageStorage['image3'];
    body.image4 = this.imageStorage['image4'];
    body.image5 = this.imageStorage['image5'];
    body.image6 = this.imageStorage['image6'];
    body.feedback_background = this.imageStorage['feedback_background'];

    this.http.put(
      'https://localhost:7004/api/AboutUs/UpdateAboutUsElements',body
    ).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Update About!',
          text: 'The About Us element has been updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });


        this.GetAllAboutUsElements();
        console.log('Updated successfully');
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while update the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred', err);
      }
    );
  }

  imageStorage: { [key: string]: any } = {}; // Store all uploaded images by key
  UploadAttachment(file: FormData, apiPath: string, imgNumber: string) {
    this.http.post(`https://localhost:7004/api/AboutUs/${apiPath}`, file).subscribe(
      (response: any) => {
        console.log('Upload successful', response);
        // Store the uploaded image using the image number as key
        this.imageStorage[imgNumber] = response[imgNumber];
      },
      (err) => {
        console.error('Error occurred', err);
      }
    );
  }
}