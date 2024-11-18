import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TripPriceService } from 'src/app/Services/trip-price.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  @ViewChild('callDetailsBookDailog') DetailsBookDailog !: TemplateRef<any>;
  @ViewChild('callDetailsVolunteerDailog') DetailsVolunteerDailog !: TemplateRef<any>;
  @ViewChild('callReviewFormDailog') ReviewFormDailog !: TemplateRef<any>;
  loginId: number | null = null;
  bookingIds: number[] = [];
  reviewExists: boolean[] = [];
  reviewMessages: string[] = [];

  constructor(public home: HomeService, private router: Router, public dialog: MatDialog, private http: HttpClient, public tripPrice: TripPriceService) { }

  async ngOnInit() {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    const userId = Number(user?.loginid);
    await this.home.GetUserinfoByLoginId(userId);
    this.loadFavorites();
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.loginId = parsedData.loginid ? Number(parsedData.loginid) : null;
      if (this.loginId !== null) {
        this.home.getUserinfoByLoginIdForReview(this.loginId);
      } else {
      }
    }
  }


  checkReviewsExistence(bookingIds: number[]): void {
    this.http.get(`https://localhost:7004/api/Review/GetreviewByBookingID/${bookingIds[0]}`).subscribe(
      (result: any) => {
        this.bookingIds.forEach((bookingId, index) => {
          const reviewData = result.find((review: any) => review.booking_Id === bookingId);
          if (reviewData && reviewData.exists === true) {
            this.reviewExists[index] = true;
            this.reviewMessages[index] = 'Review already exists';
          } else {
            this.reviewExists[index] = false;
            this.reviewMessages[index] = 'Review not yet submitted. You can submit now.';
          }
        });
      },
      (err: any) => {
        console.error('Error checking reviews existence:', err.message);
      }
    );
  }

  pData: any;
  dialogRef!: MatDialogRef<any>;
  selectedBooking: any;
  selectedVolunteer: any;
  tripData: any;
  bookingServices:any;
  combinedServices:any;

  async openDetailsBookDialog(booking: any) {
    this.selectedBooking = booking;
    console.log('selected',this.selectedBooking)
    this.loadFavorites();
    await this.home.GetBookingServiceByBookingId(this.selectedBooking.booking_Id);
    this.bookingServices=this.home.bookingServices;
    console.log('bookingServices', this.bookingServices)
    await this.home.getTripById(this.selectedBooking.booking_Id)

    this.home.getTripById(booking.trip_Id).subscribe(async result => {
      this.tripData = result;
      console.log('Trip Data:', this.tripData);

     this.combinedServices = [
      ...this.tripData.services.map((service: any) => ({
        service_Name: service.service_Name,
        service_Cost: service.service_Cost
      })),
      ...this.bookingServices.map((service:any) => ({
        service_Name: service.service_Name,
        service_Cost: service.service_Cost
      }))
    ];
    await this.tripPrice.calculateTripPriceForASingleTrip(this.tripData);
    console.log('before',this.selectedBooking.trip_Price);

    this.selectedBooking.trip_Price=this.tripData.trip_Price;
    console.log(this.combinedServices);
    console.log('after',this.selectedBooking.trip_Price);

  });
    await this.dialog.open(this.DetailsBookDailog);
  }

  openDetailsVolunteerDailog(volunteer: any): void {
    this.selectedVolunteer = volunteer;
    this.dialogRef = this.dialog.open(this.DetailsVolunteerDailog, {
      disableClose: true
    });
  }

  YourTripsAndFavorites(): void {
    this.router.navigate(['userProfile']);
  }

  deleteBooking(bookingId: number): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    const userId = Number(user?.loginid);
    this.home.Deletebookings(bookingId, userId);
  }

  deleteVolunteer(volunteerId: number): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    const userId = Number(user?.loginid);
    this.home.DeleteVolanteerReqs(volunteerId, userId);
  }

  goPayment(id: number) {
    this.router.navigate(['payment', id]);
  }

  favorites: any[] = [];

  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  removeFavorite(tripId: string) {
    const index = this.favorites.findIndex((favorite: any) => favorite.tripId === tripId);

    if (index > -1) {
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.loadFavorites();
    }
  }

  goToDetails(tripId: string) {
    this.router.navigate(['tripDetails/', tripId]);
  }

  Review: FormGroup = new FormGroup({
    rate: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
    booking_Id: new FormControl('', Validators.required),
    trip_Id: new FormControl('', Validators.required)
  })

  openDialogReview(booking: any) {
    this.pData = booking;
    this.dialog.open(this.ReviewFormDailog);
  }

  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  setRating(star: number) {
    this.rating = star;
    this.Review.get('rate')?.setValue(this.rating);
  }

  save() {
    this.Review.controls['booking_Id'].setValue(this.pData.booking_Id);
    this.Review.controls['trip_Id'].setValue(this.pData.trip_Id);
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    const userId = Number(user?.loginid);

    this.home.CreateReviews(this.Review.value, userId);
    this.dialog.closeAll();
  }
}