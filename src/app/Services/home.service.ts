import { Injectable,Component,OnInit  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   constructor(public http:HttpClient) { }
   homePageElements:any=[];
   AboutUsElements:any=[];
   selectedAboutus: any = {};
   selectedHome: any = {};
   
  
   GetAllAboutUsElements(){
    //  debugger;
    this.http.get('https://localhost:7004/api/AboutUs/GetAllAboutUsElements').subscribe((res:any)=>{
    this.AboutUsElements=res; 
     console.log(this.AboutUsElements); 
    },err=>{
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

GetAllHomePageElements() {
  this.http.get('https://localhost:7004/api/HomePageElements/GetAllHomePageElements').subscribe((res: any) => {
    this.homePageElements = res;
    console.log(this.homePageElements);
  }, err => {
    console.log(err.status);
  })
}

//Trip
Trips:any=[];
  tripDetails:any;

  getALLTrips(){
    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformation/").subscribe(res=>{
      this.Trips=res;
      console.log(this.Trips)

    },err=>{
      console.log(err.message)
    })
  }
  getTripById(id:number){
    const params = new HttpParams().set('id', id.toString());

    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformationById", { params }).subscribe(res=>{
      this.tripDetails=res;
      console.log("ffffff",this.tripDetails)

    },err=>{
      console.log(err.message)
    })
  }



  //Trip Image 
  tripImage:any=[];

  GetTripImageByTripId(id:number){
    this.http.get("https://localhost:7004/api/TripImage/GetTripImageByTripId/"+id).subscribe(res=>{
      this.tripImage=res;
    },err=>{
      console.log(err.message)
    })
  }

  //Service
  tripService:any=[];
  GetServiceByTripId(id:number){
    this.http.get("https://localhost:7004/api/Service/GetServiceByTripId/"+id).subscribe(res=>{
      this.tripService=res;
    },err=>{
      console.log(err.message)
    })
  }

DeleteHomePageElements(id: number) {
  this.http.delete('https://localhost:7004/api/HomePageElements/DeleteHomePageElement/' + id).subscribe(response => {
    console.log('deleted')
  },
    err => {
      console.log('errer');
    })
}

CreateHomePageElements(body: any) {
  body.hero_Image = this.imageStorage['hero_Image'];
  body.image1 = this.imageStorage['image1'];
  body.image2 = this.imageStorage['image2'];
  body.image3 = this.imageStorage['image3'];

  console.log('Final Body:', body);
  this.http.post('https://localhost:7004/api/HomePageElements/CreateHomePageElement/', body).subscribe(
    (response) => {
      console.log('Created successfully');
    },
    (err) => {
      console.error('Error occurred while creating', err);
    }
  );
}


// UpdateSelectedAboutus(id: number) {
//   const params = new HttpParams().set('id', id.toString());
//   this.http.put(
//     'https://localhost:7004/api/AboutUs/UpdateSelectedAboutus',
//     {}, // Empty body as you're sending the id in query parameters
//     { params } // Add the parameters here
//   ).subscribe(
//     response => {
//       console.log('Updated successfully');
//     },
//     err => {
//       console.error('Error occurred', err);
//     }
//   );
// }

UpdateHopmePageElements(body:any){
  body.hero_Image = this.imageStorage['hero_Image'];
  body.image1 = this.imageStorage['image1'];
  body.image2 = this.imageStorage['image2'];
  body.image3 = this.imageStorage['image3'];
  this.http.put(
    'https://localhost:7004/api/HomePageElements/UpdatHomePageElement',body
  ).subscribe(
    response => {
      console.log('Updated successfully');
    },
    err => {
      console.error('Error occurred', err);
    }
  );
}

imageStorage: { [key: string]: any } = {}; // Store all uploaded images by key
UploadAttachment(file: FormData, apiPath: string, imgNumber: string) {
  this.http.post(`https://localhost:7004/api/HomePageElements/${apiPath}`, file).subscribe(
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
  async GetSelectedHomeElement(): Promise<void> {
  try {
  const res = await this.http.get('https://localhost:7004/api/HomePageElements/GetSelectedHomeElement').toPromise();
    this.selectedHome = res;
  } catch (error) {
    console.error('Error fetching selected element:', error);
  }
}
UpdateSelectedHomeElement(id: number) {
  console.log(id,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  const params = new HttpParams().set('id', id.toString());
  this.http.put(
    'https://localhost:7004/api/HomePageElements/UpdateHomeSelectStatus', 
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


//Testimonial
Testimonial:any=[];
GetAcceptedTestimonies() {
  this.http.get("https://localhost:7004/api/Testimonial/GetAcceptedTestimonies").subscribe(
    res => {
      this.Testimonial = res;
      console.log(this.Testimonial);
    },
    err => {
      console.log(err.message);
    }
  );
}


  CreateTestimonial(body:any){
    this.http.post("https://localhost:7004/api/Testimonial/CreateTestimony",body).subscribe(res=>{
      console.log(this.Testimonial)
    },err=>{
      console.log(err.message)
    })
  }


}
