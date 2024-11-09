import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(public http: HttpClient, private router: Router) { }
  homePageElements: any = [];
  AboutUsElements: any = [];
  selectedAboutus: any = {};
  selectedHome: any = {};
  topRatedTrips: any = [];



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

  GetAllHomePageElements() {
    this.http.get('https://localhost:7004/api/HomePageElements/GetAllHomePageElements').subscribe((res: any) => {
      this.homePageElements = res;
      console.log(this.homePageElements);
    }, err => {
      console.log(err.status);
    })
  }

  //Trip
  Trips: any = [];
  tripDetails: any;

  getALLTrips() {
    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformation/").subscribe(res => {
      this.Trips = res;
      console.log('tripstrips',this.Trips)

    }, err => {
      console.log(err.message);

    })
  }
  getTripById(id: number) {
    const params = new HttpParams().set('id', id.toString());

    this.http.get("https://localhost:7004/api/Trips/GetAllTripInformationById", { params }).subscribe(res => {
      this.tripDetails = res;
      console.log("ffffff", this.tripDetails)

    }, err => {
      console.log(err.message);

    })
  }

  // 
  GetTripVolunteer: any = [];
  GetTripVolunteers(tripId: number) {
    // Ensure the tripId is part of the URL path
    this.http.get(`https://localhost:7004/api/Volunteers/GetTripVolunteers/${tripId}`).subscribe(res => {
      this.GetTripVolunteer = res;
      console.log("vvvvvvvvvvvvv", res);
    }, err => {
      console.log("Error: ", err.message);
    });
  }



  //booking

  CreateBooking(body: any) {
    this.http.post('https://localhost:7004/api/Booking/CreateBooking', body).subscribe({
      next: (resp: any) => {
        if (resp?.bookingId) {
          console.log('Booking created with ID:', resp.bookingId);
          this.showAlert(resp.bookingId);
        } else {
          console.error('Booking ID not returned in response');
        }
      },
      error: (err) => {
        console.error('Error creating booking:', err);
      }
    });
  }
  showAlert(id: number) {
    Swal.fire({
      title: 'Success!',
      text: 'Your reservation has been saved! You should pay to confirm the reservation!',
      icon: 'success',
      confirmButtonText: 'payment Now!',
      cancelButtonText: 'Later',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['payment', id]);
      } else {
        console.log('User chose to pay later');
      }
    });
  }

  errorAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'something want wrong try it later !',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  // User card
  userCard: any;
  GetCardByLoginId(id: number) {
    this.http.get("https://localhost:7004/api/Card/GetCardByLoginId/" + id).subscribe(res => {
      this.userCard = res;
      console.log("userCard", this.userCard)
    }, err => {
      console.log(err.message);

    })
  }
  // payment
  BankCard: any;
  getALLBank() {
    this.http.get("https://localhost:7004/api/Bank").subscribe(res => {
      this.BankCard = res;
      console.log("bank", this.BankCard)

    }, err => {
      console.log(err.message);
    })
  }
  SaveCard(body: any): Promise<void> {
    return this.http.post<void>('https://localhost:7004/api/Card/CreateCard', body).toPromise()
      .then(() => {
        console.log('the Card Saved');
      }, err => {
        console.log('Error');
      })
  }
  BookingPayment: any;
  GetBookingById(id: number) {
    const params = new HttpParams().set('bookingId', id.toString());

    this.http.get("https://localhost:7004/api/Booking/GetBookingById", { params }).subscribe(res => {
      this.BookingPayment = res;
      console.log("BookingPayment", this.BookingPayment)

    }, err => {
      console.log(err.message);
    })
  }

  async UpdatePaymentStatus(body: any): Promise<void> {
    try {
      await this.http.put<void>('https://localhost:7004/api/Booking/UpdatePaymentStatus', body).toPromise();
      console.log('Updated');
    } catch (err) {
      console.error('Error updating payment status', err);
    }
  }



  UpdateBalance(body: any): Promise<void> {
    return this.http.put<void>('https://localhost:7004/api/Bank/UpdateBalance', body)
      .toPromise()
      .then(() => {
        console.log('Updated');
      })
      .catch(err => {
        console.error('Error updating balance', err);
      });
  }

  //volunteer Role

  VolunteerRoleByTripId: any;
  GetVolunteerRoleByTripId(id: number) {
    const params = new HttpParams().set('id', id.toString());
    console.log('Calling API with params:', params.toString());

    this.http.get("https://localhost:7004/api/TripVolunteerrole/GetVolunteerRoleByTripId", { params }).subscribe(
      res => {
        this.VolunteerRoleByTripId = res;
        console.log("VolunteerRoleByTripId response:", this.VolunteerRoleByTripId); // Log response data
      },
      err => {
        console.error("Error fetching volunteer role:", err); // Log full error object
      }
    );
  }




  //Booking volunteer
  BookingVolunteer(body: any) {
    this.http.post('https://localhost:7004/api/Volunteers/CreateVolunteer', body).subscribe(res => {
      console.log('The Volunteer Booking Send!');
      Swal.fire({
        icon: 'success',
        title: 'Volunteer Request Sent Successfully!',
        text: 'We will send a response to your email as soon as possible.',
        showConfirmButton: false,
        timer: 5000
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'There was an error with your booking,Try it later!',
      });
      console.log(err.message);
    })
  }

  //All Booking by trip id
  BookingByTripId: any;
  GetBookingByTripId(TripId: number, LoginId: number) {
    const params = new HttpParams()
      .set('TripId', TripId.toString())
      .set('LoginId', LoginId.toString());

    this.http.get("https://localhost:7004/api/Booking/GetBookingByTripId", { params }).subscribe(res => {
      this.BookingByTripId = res;
      console.log("BookingByTripId", this.BookingByTripId)
    }, err => {
      console.log(err.message);
    })
  }

  // all volunteers by trip id
  VolunteerByTripId: any;
  GetVolunteerByTripId(TripId: number, LoginId: number) {
    const params = new HttpParams()
      .set('TripId', TripId.toString())
      .set('LoginId', LoginId.toString());
    this.http.get("https://localhost:7004/api/Volunteers/GetVolunteerByTripId", { params }).subscribe(res => {
      this.VolunteerByTripId = res;
      console.log("VolunteerByTripId", this.VolunteerByTripId)
    }, err => {
      console.log(err.message);
    })
  }

  //Delete booking
  Deletebooking(bookingId: number) {
    this.http.delete('https://localhost:7004/api/Booking/DeleteBooking/' + bookingId).subscribe(response => {
      console.log('deleted')
    },
      err => {
        console.log('errer');
      })
  }

  //Delete volanteer

  DeleteVolanteerReq(id: number) {
    this.http.delete('https://localhost:7004/api/Volunteers/DeleteVolunteer/' + id).subscribe(response => {
      console.log('deleted')
    },
      err => {
        console.log('errer');
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
    body.logo_Image = this.imageStorage['logo_Image'];

    console.log('Final Body:', body);
    this.http.post('https://localhost:7004/api/HomePageElements/CreateHomePageElement/', body).subscribe(
      (response) => {
        console.log('Created successfully');
        window.location.reload();
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

  UpdateHopmePageElements(body: any) {
    body.hero_Image = this.imageStorage['hero_Image'];
    body.logo_Image = this.imageStorage['logo_Image'];
    this.http.put(
      'https://localhost:7004/api/HomePageElements/UpdatHomePageElement', body
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
      console.log(this.selectedHome);
      console.log('this.selectedHomethis.selectedHomethis.selectedHomethis.selectedHome');
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
  UpdateSelectedHomeElement(id: number) {
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
  Testimonial: any = [];
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


  CreateTestimonial(body: any) {
    this.http.post("https://localhost:7004/api/Testimonial/CreateTestimony", body).subscribe(res => {
      console.log(this.Testimonial)
    }, err => {
      console.log(err.message)
    })
  }

  volunteer: any = [];
  searchVolunteers(searchCriteria: any): Observable<any[]> {
    return this.http.post<any[]>(`https://localhost:7004/api/Volunteers/SearchVolunteers`, searchCriteria);
  }



  AllVolunteersWithTrip: any = [];
  AllVolunteersWithTrips() {
    this.http.get("https://localhost:7004/api/Volunteers/AllVolunteersWithTrips").subscribe(
      res => {
        this.AllVolunteersWithTrip = res;
        console.log('AllVolunteersWithTrip', res);
      },
      err => {
        console.log(err.message);
      }
    );
  }

  getTopRatedTrips() {
    this.http.get('https://localhost:7004/api/Trips/GetTopRatedTrips').subscribe(res => {
      this.topRatedTrips = res;
      console.log(this.topRatedTrips);
    }, err => {
      console.log(err.message);
    })
  }
}
