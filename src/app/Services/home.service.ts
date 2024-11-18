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
  loginId: number | null = null;
  bookingIds: number[] = [];
  reviewExists: boolean[] = [];
  reviewMessages: string[] = [];
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

  GetAllHomePageElements() {
    this.http.get('https://localhost:7004/api/HomePageElements/GetAllHomePageElements').subscribe((res: any) => {
      this.homePageElements = res;
    }, err => {
    })
  }

  //Trip
  Trips: any = [];
  tripDetails: any;

  async getALLTrips(): Promise<void> {
    try {
      const res = await this.http.get("https://localhost:7004/api/Trips/GetAllTripInformation/").toPromise();
      this.Trips = res;
    } catch (error) {
    }
  }

  tripswithoutOptionalServices: any
  async getALLTripsWithoutOptionalServices(): Promise<void> {
    try {
      const res = await this.http.get("https://localhost:7004/api/Trips/GETALLTRIPINFORMATIONWITHOUTOPTIONALSERVICES/").toPromise();
      this.tripswithoutOptionalServices = res;
    } catch (error) {
    }
  }


  getTripById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());

    return this.http.get("https://localhost:7004/api/Trips/GetAllTripInformationById", { params });
  }

  tripDetailsWithOptionalServices: any;
  async getTripByIdWithOptionalServices(id: number): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/Trips/GetAllTripInformationByIdWithOptionalServices/${id}`).toPromise();
      this.tripDetailsWithOptionalServices = res;
    } catch (error) {
    }
  }

  GetTripVolunteer: any = [];
  GetTripVolunteers(tripId: number) {
    this.http.get(`https://localhost:7004/api/Volunteers/GetTripVolunteers/${tripId}`).subscribe(res => {
      this.GetTripVolunteer = res;
    }, err => {
    });
  }

  //booking
  CreateBooking(body: any) {
    this.http.post('https://localhost:7004/api/Booking/CreateBooking', body).subscribe({
      next: (resp: any) => {
        if (resp?.bookingId) {
          this.showAlert(resp.bookingId);
        }
      },
      error: (err) => {
      }
    });
  }

  updateMaxUser(id: number, res_num: number): Promise<void> {
    return this.http.put<void>(`https://localhost:7004/api/Trips/updateMaxUser?id=${id}&res_num=${res_num}`, {})
      .toPromise()
      .then(() => {
      })
      .catch(err => {
        throw err;
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
    }, err => {
    })
  }
  // payment
  BankCard: any;
  getALLBank() {
    this.http.get("https://localhost:7004/api/Bank").subscribe(res => {
      this.BankCard = res;
    }, err => {
    })
  }

  SaveCard(body: any): Promise<void> {
    return this.http.post<void>('https://localhost:7004/api/Card/CreateCard', body).toPromise()
      .then(() => {
      }, err => {
      })
  }
  BookingPayment: any;
  GetBookingById(id: number) {
    const params = new HttpParams().set('bookingId', id.toString());

    this.http.get("https://localhost:7004/api/Booking/GetBookingById", { params }).subscribe(res => {
      this.BookingPayment = res;

    }, err => {
    })
  }

  //volunteer Role
  async UpdatePaymentStatus(body: any): Promise<void> {
    try {
      // Update payment status
      const paymentResponse = await this.http.put<any>('https://localhost:7004/api/Booking/UpdatePaymentStatus', body).toPromise();
      const params = new HttpParams().set('bookingId', body.booking_Id.toString());
      const bookingResponse = await this.http.get<any>("https://localhost:7004/api/Booking/GetBookingById", { params }).toPromise();
      const paymentStatus = bookingResponse?.payment_Status || 'Not Available';
      const totalAmount = bookingResponse?.total_Amount || 'Not Available';
      const receiverEmail = localStorage.getItem('email');
      if (!receiverEmail) {
        return;
      }

      const emailBody = `
        Booking ID: ${body.booking_Id}
        Trip Name: ${body.Trip_Name}
        Start Date: ${body.Start_Date}
        End Date: ${body.End_Date}
        Departure Location: ${body.Departure_Location}
  
        Services:
        ${body.Services.map((service: any) =>
        `- ${service.service_Name}: $${service.service_Cost}`).join('\n')}
  
        Payment Status: ${paymentStatus}
        Total Amount: $${totalAmount}

      `;

      // Prepare the email request body
      const emailRequest = {
        ReceiverEmail: receiverEmail,
        Body: emailBody
      };

      // Send email with PDF attachment
      this.http.post('https://localhost:7004/api/Trips/SendEmailWithPdfAttachment', emailRequest)
        .subscribe(
          res => {
          },
          err => {
          }
        );

    } catch (err) {
    }
  }

  UpdateBalance(body: any): Promise<void> {
    return this.http.put<void>('https://localhost:7004/api/Bank/UpdateBalance', body)
      .toPromise()
      .then(() => {
      })
      .catch(err => {
      });
  }

  //volunteer Role
  VolunteerRoleByTripId: any;
  GetVolunteerRoleByTripId(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.get("https://localhost:7004/api/TripVolunteerrole/GetVolunteerRoleByTripId", { params }).subscribe(
      res => {
        this.VolunteerRoleByTripId = res;
      },
      err => {
      }
    );
  }

  RoleByTripId: any;
  GetRoleByTripId(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get("https://localhost:7004/api/TripVolunteerrole/GetVolunteerRoleByTripId", { params });
  }

  //Booking volunteer
  BookingVolunteer(body: any) {
    this.http.post('https://localhost:7004/api/Volunteers/CreateVolunteer', body).subscribe(res => {
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
    })
  }

  //All Booking by trip id
  BookingByTripId: any;
  GetBookingByTripId(TripId: number, LoginId: number) {
    console.log(TripId,LoginId)
    const params = new HttpParams()
      .set('TripId', TripId.toString())
      .set('LoginId', LoginId.toString());
    this.http.get("https://localhost:7004/api/Booking/GetBookingByTripId", { params }).subscribe(res => {
      this.BookingByTripId = res;
      console.log('BookingByTripId', this.BookingByTripId)

    }, err => {
    })
  }

  // get review 
  review: any;
  GetReviewByCategoryId(id: number) {
    this.http.get('https://localhost:7004/api/Review/GetreviewBycategoryId/' + id).subscribe(result => {
      this.review = result;
    }, err => {
    })
  }

  //get similar Trips
  similarTrip: any;
  GetSimilarTrips(id: number) {
    this.http.get('https://localhost:7004/api/Trips/GetAlltripsByCategory/' + id).subscribe(result => {
      this.similarTrip = result;
    }, err => {
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
    }, err => {
    })
  }

  //Delete booking
  Deletebooking(bookingId: number) {
    this.http.delete('https://localhost:7004/api/Booking/DeleteBooking/' + bookingId).subscribe(response => {
    },
      err => {
      })
  }

  DeleteVolanteerReq(id: number) {
    this.http.delete('https://localhost:7004/api/Volunteers/DeleteVolunteer/' + id).subscribe(response => {
    },
      err => {
      })
  }

  Deletebookings(bookingId: number, loginid: number) {
    this.http.delete('https://localhost:7004/api/Booking/DeleteBooking/' + bookingId).subscribe(response => {
      this.GetUserinfoByLoginId(loginid)
    },
      err => {
      })
  }

  DeleteVolanteerReqs(id: number, loginid: number) {
    this.http.delete('https://localhost:7004/api/Volunteers/DeleteVolunteer/' + id).subscribe(response => {
      this.GetUserinfoByLoginId(loginid)
    },
      err => {
      })
  }
  UserInformation: any;
  GetUserinfoByLoginId(id: number) {
    this.http.get('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/' + id).subscribe(result => {
      this.UserInformation = result;
    }, err => {
    })
  }

  GetUserinfo(id: number): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/' + id)
  }

  bookingServices: any;
  async GetBookingServiceByBookingId(id: number): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/BookingServices/GetBookingServiceByBookingId/' + id).toPromise();
      this.bookingServices = res;
    } catch (error) {
    }
  }

  CreateHomePageElements(body: any) {
    body.hero_Image = this.imageStorage['hero_Image'];
    body.logo_Image = this.imageStorage['logo_Image'];

    this.http.post('https://localhost:7004/api/HomePageElements/CreateHomePageElement/', body).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Create!',
          text: 'The Home Page element has been created successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        this.GetAllHomePageElements();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while created the element. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  DeleteHomePageElements(id: number) {
    this.http.delete('https://localhost:7004/api/HomePageElements/DeleteHomePageElement/' + id)
  }

  UpdateHopmePageElements(body: any) {
    body.hero_Image = this.imageStorage['hero_Image'];
    body.logo_Image = this.imageStorage['logo_Image'];
    this.http.put(
      'https://localhost:7004/api/HomePageElements/UpdatHomePageElement', body
    ).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Update!',
          text: 'The Hopme Page element has been updated successfully.',
          showConfirmButton: false,
          timer: 2000
        });
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
    this.http.post(`https://localhost:7004/api/HomePageElements/${apiPath}`, file).subscribe(
      (response: any) => {
        this.imageStorage[imgNumber] = response[imgNumber];
      },
      (err) => {
      }
    );
  }
  async GetSelectedHomeElement(): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/HomePageElements/GetSelectedHomeElement').toPromise();
      this.selectedHome = res;
    } catch (error) {
    }
  }

  UpdateSelectedHomeElement(id: number) {
    console.log('id', id)
    const params = new HttpParams().set('id', id.toString());
    this.http.put(
      'https://localhost:7004/api/HomePageElements/UpdateHomeSelectStatus',
      {},
      { params }
    ).subscribe(
      (response: any) => {
        console.log('update selected');
      },
      (err) => {
        console.log('error');

      }
    );
  }
  //Testimonial
  Testimonial: any = [];
  GetAcceptedTestimonies() {
    this.http.get("https://localhost:7004/api/Testimonial/GetAcceptedTestimonies").subscribe(
      res => {
        this.Testimonial = res;
      },
      err => {
      }
    );
  }

  CreateTestimonial(body: any) {
    this.http.post("https://localhost:7004/api/Testimonial/CreateTestimony", body).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Testimonial Submitted',
          text: 'Your testimonial has been submitted successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      },
      (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'There was an error submitting your testimonial. Please try again later.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Retry'
        });
      }
    );
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
      },
      err => {
      }
    );
  }

  getTopRatedTrips() {
    this.http.get<any[]>('https://localhost:7004/api/Trips/GetTopRatedTrips').subscribe(res => {
      this.topRatedTrips = res.slice(0, 6);
    }, err => {
    })
  }

  GetUserinfoForReview: any;
  getUserinfoByLoginIdForReview(loginId: number) {
    return this.http.get(`https://localhost:7004/api/UserLogin/GetUserinfoByLoginIdForReview/${loginId}`).subscribe((userInfo: any) => {
      if (userInfo.bookings && userInfo.bookings.length > 0) {
        this.bookingIds = userInfo.bookings.map((booking: any) => booking.booking_Id);
        this.checkReviewsExistence(this.bookingIds);
      }
    });
  }

  checkReviewsExistence(bookingIds: number[]): void {
    bookingIds.forEach((bookingId, index) => {
      this.http.get(`https://localhost:7004/api/Review/GetreviewByBookingID/${bookingId}`).subscribe(
        (result: any) => {
          if (result && Object.keys(result).length > 0) {
            this.reviewExists[index] = true;
            this.reviewMessages[index] = 'Review already exists';
          } else {
            this.reviewExists[index] = false;
            this.reviewMessages[index] = 'Review not yet submitted. You can submit now.';
          }
        },
        (err: any) => {
          this.reviewExists[index] = false;
          this.reviewMessages[index] = 'Error checking review existence';
        }
      );
    });
  }

  CreateReviews(body: any, loginid: number) {
    this.http.post("https://localhost:7004/api/Review/CreateReview", body).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted',
          text: 'Your Review has been submitted successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });

        this.checkReviewsExistence(this.bookingIds);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'There was an error submitting your Review. Please try again later.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Retry'
        });
      }
    );
  }

  GetCategoryWithImageAndTrips: any;
  GetAllCategoryWithImageAndTrips() {
    this.http.get('https://localhost:7004/api/categories/GetCategoryWithImageAndTrips').subscribe(res => {
      this.GetCategoryWithImageAndTrips = res;
    }, err => {
    })
  }

  AllTeam: any;
  GetAllTeam() {
    this.http.get('https://localhost:7004/api/ContactusElement/GetAllTeam').subscribe(res => {
      this.AllTeam = res;
    }, err => {
    })
  }
}