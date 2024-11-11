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
        const updateUserBody = {
          id: resp.tripId, // Assuming the trip ID is returned in the response
          res_num: resp.numberOfUsers // Assuming the number of users is in the response
        };

        // Update max users
        this.updateMaxUser(updateUserBody.id, updateUserBody.res_num)
          .then(() => {
            console.log('Max number of users updated successfully');
          })
          .catch(err => {
            console.error('Error updating max number of users:', err);
          });
        this.showAlert(resp.bookingId);
      }
    }
  })
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




updateMaxUser(id: number, res_num: number): Promise<void> {
  return this.http.put<void>(`https://localhost:7004/api/Trips/updateMaxUser?id=${id}&res_num=${res_num}`, {})
    .toPromise()
    .then(() => {
      console.log('Max number of users updated');
    })
    .catch(err => {
      console.error('Error updating MaxUser:', err);
    });
}
//volunteer Role

  async UpdatePaymentStatus(body: any): Promise<void> {
    try {
      // Update payment status
      const paymentResponse = await this.http.put<any>('https://localhost:7004/api/Booking/UpdatePaymentStatus', body).toPromise();
  
      // Get booking information
      const params = new HttpParams().set('bookingId', body.booking_Id.toString());
      const bookingResponse = await this.http.get<any>("https://localhost:7004/api/Booking/GetBookingById", { params }).toPromise();
        
      // Extract payment status and total amount
      const paymentStatus = bookingResponse?.payment_Status || 'Not Available';
      const totalAmount = bookingResponse?.total_Amount || 'Not Available';
        
      
      // Get email from local storage
      const receiverEmail = localStorage.getItem('email');
      if (!receiverEmail) {
        console.error('User email not found in local storage');
        return;
      }
  
      // Extract relevant information for the email body
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
            console.log('Success: Email sent');
          },
          err => {
            console.error('Error: Failed to send email', err);
          }
        );
  
      console.log('Payment status updated and email request sent');
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

//deleted for user trip page 
//Delete booking
Deletebookings(bookingId: number,loginid:number) {
  this.http.delete('https://localhost:7004/api/Booking/DeleteBooking/' +bookingId).subscribe(response => {
    console.log('deleted')
    this.GetUserinfoByLoginId(loginid)
  },
    err => {
      console.log('errer');
    })
}

//Delete volanteer

DeleteVolanteerReqs(id: number,loginid:number) {
  this.http.delete('https://localhost:7004/api/Volunteers/DeleteVolunteer/' +id).subscribe(response => {
    console.log('deleted')
    this.GetUserinfoByLoginId(loginid)
  },
    err => {
      console.log('errer');
    })
}
//user login information
UserInformation:any; 
GetUserinfoByLoginId(id:number){ 
 this.http.get('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/'+ id).subscribe(result=>{
this.UserInformation =result ;  
console.log("UserInformation",this.UserInformation);

},err=>{
      console.log(err.message);     
})}
//user login information
bookingServices:any; 
GetBookingServiceByBookingId(id:number){ 
 this.http.get('https://localhost:7004/api/BookingServices/GetBookingServiceByBookingId/'+ id).subscribe(result=>{
this.bookingServices =result ;  
console.log("bookingServices",this.bookingServices);

},err=>{
      console.log(err.message);     
})}


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
        
      Swal.fire({
        icon: 'success',
        title: 'Create!',
        text: 'The Home Page element has been created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
        console.log('Created successfully');
        this.GetAllHomePageElements();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while created the element. Please try again.',
          confirmButtonText: 'OK'
        });
        console.error('Error occurred while creating', err);

      }
    );
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
  this.http.post("https://localhost:7004/api/Testimonial/CreateTestimony", body).subscribe(
    (res) => {
      console.log(this.Testimonial);

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Testimonial Submitted',
        text: 'Your testimonial has been submitted successfully!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    },
    (err) => {
      console.log(err.message);

      // Show error message using SweetAlert2
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
