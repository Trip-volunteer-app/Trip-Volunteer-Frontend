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
    this.http.get('https://localhost:7004/api/AboutUs/GetAllAboutUsElements').subscribe((res: any) => {
      this.AboutUsElements = res;
    }, err => {
    })
  }

  async GetSelectedAboutus(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/AboutUs/GetSelectedAboutus`).toPromise();
      this.selectedAboutus = res;
    } catch (error) {
    }
  }

  DeleteAboutUsElements(id: number) {
    this.http.delete('https://localhost:7004/api/AboutUs/DeleteAboutUsElements/' + id).subscribe(
      response => {
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
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the element. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  CreateAboutUsElements(body: any) {
    body.hero_image = this.imageStorage['hero_image'];
    body.image1 = this.imageStorage['image1'];
    body.image2 = this.imageStorage['image2'];
    body.image3 = this.imageStorage['image3'];
    body.image4 = this.imageStorage['image4'];
    body.image5 = this.imageStorage['image5'];
    body.image6 = this.imageStorage['image6'];

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
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Created the element. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  UpdateSelectedAboutus(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.put('https://localhost:7004/api/AboutUs/UpdateSelectedAboutus',
      {},
      { params }
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
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Selected the element. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  UpdateAbout(body: any) {
    body.hero_image = this.imageStorage['hero_image'];
    body.image1 = this.imageStorage['image1'];
    body.image2 = this.imageStorage['image2'];
    body.image3 = this.imageStorage['image3'];
    body.image4 = this.imageStorage['image4'];
    body.image5 = this.imageStorage['image5'];
    body.image6 = this.imageStorage['image6'];
    body.feedback_background = this.imageStorage['feedback_background'];

    this.http.put(
      'https://localhost:7004/api/AboutUs/UpdateAboutUsElements', body
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
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while update the element. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  imageStorage: { [key: string]: any } = {};
  UploadAttachment(file: FormData, apiPath: string, imgNumber: string) {
    this.http.post(`https://localhost:7004/api/AboutUs/${apiPath}`, file).subscribe(
      (response: any) => {
        this.imageStorage[imgNumber] = response[imgNumber];
      },
      (err) => {
      }
    );
  }
}