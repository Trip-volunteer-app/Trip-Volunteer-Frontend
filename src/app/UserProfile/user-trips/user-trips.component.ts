import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ReviewFormComponent } from 'src/app/review-form/review-form.component';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  @ViewChild('callDetailsBookDailog') DetailsBookDailog !: TemplateRef<any>; 
  @ViewChild('callDetailsVolunteerDailog') DetailsVolunteerDailog !: TemplateRef<any>;  
  @ViewChild('callReviewFormDailog') callReviewFormDailog !: TemplateRef<any>;  


  loginId: number | null = null;
  bookingIds: number[] = [];  // Store all the booking IDs as an array
  reviewExists: boolean[] = [];  // Track if review exists for each booking ID
  reviewMessages: string[] = [];  // Store review messages for each booking


  constructor(public home: HomeService, private router: Router, public dialog: MatDialog,private http: HttpClient) {}

  
  async ngOnInit() {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
  
    const userId = Number(user?.loginid);
  
    // Fetch user info and then load favorites
    await this.home.GetUserinfoByLoginId(userId);
    this.loadFavorites();
  
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.loginId = parsedData.loginid ? Number(parsedData.loginid) : null;
      console.log('Login ID:', this.loginId);
  
      if (this.loginId !== null) {
        this.home.getUserinfoByLoginIdForReview(this.loginId).subscribe((userInfo: any) => {
          if (userInfo.bookings && userInfo.bookings.length > 0) {
            // Extract all booking IDs from userInfo
            this.bookingIds = userInfo.bookings.map((booking: any) => booking.booking_Id);
            console.log('Booking IDs:', this.bookingIds);
  
            // Check reviews existence for all booking IDs in a single request
            this.checkReviewsExistence(this.bookingIds);
          } else {
            console.error('No bookings found for user');
          }
        });
      } else {
        console.error('Login ID is null');
      }
    }
  }
  
  // New Method to Check Reviews Existence for All Booking IDs
  checkReviewsExistence(bookingIds: number[]): void {
    this.http.get(`https://localhost:7004/api/Review/GetreviewByBookingID/${bookingIds[0]}`).subscribe(
      (result: any) => {
        console.log('API Response:', result);
  
        // Loop through the result and update reviewExists and reviewMessages arrays
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
  
  

    openDialogReview(){
      // this.dialog.open(ReviewFormComponent)
      this.router.navigate(['/ReviewForm']);
    }


  dialogRef!: MatDialogRef<any>;
  selectedBooking: any;
  selectedVolunteer: any;

  // Open dialog for booking details
  async openDetailsBookDialog(booking: any) {
    this.selectedBooking = booking;
    this.loadFavorites();
    await this.home.GetBookingServiceByBookingId(this.selectedBooking.booking_Id);
    await this.dialog.open(this.DetailsBookDailog);
  }

  // Open dialog for volunteer details
  openDetailsVolunteerDailog(volunteer: any): void {
    this.selectedVolunteer = volunteer;
    console.log("selectedVolunteer", this.selectedVolunteer);
    this.dialogRef = this.dialog.open(this.DetailsVolunteerDailog, {
      disableClose: true
    });
  }

  // Navigate to the user profile
  YourTripsAndFavorites(): void {
    this.router.navigate(['userProfile']);
  }

  // Delete a booking
  deleteBooking(bookingId: number): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    const userId = Number(user?.loginid);
    this.home.Deletebookings(bookingId, userId);
  }

  // Delete a volunteer
  deleteVolunteer(volunteerId: number): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    const userId = Number(user?.loginid);
    this.home.DeleteVolanteerReqs(volunteerId, userId);
  }

  // Navigate to the payment page
  goPayment(id: number) {
    this.router.navigate(['payment', id]); 
  }

  favorites: any[] = [];

  // Load favorites from localStorage
  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log("Loaded favorites:", this.favorites);
  }

  // Remove a favorite trip
  removeFavorite(tripId: string) {
    const index = this.favorites.findIndex((favorite: any) => favorite.tripId === tripId);

    if (index > -1) {
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.loadFavorites(); // Reload favorites after removal
    }
  }

  // Navigate to trip details page
  goToDetails(tripId: string) {
    this.router.navigate(['tripDetails/', tripId]);
  }
}
