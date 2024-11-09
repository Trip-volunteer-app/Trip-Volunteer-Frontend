import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  @ViewChild('callDetailsBookDailog') DetailsBookDailog !: TemplateRef<any>; 
  @ViewChild('callDetailsVolunteerDailog') DetailsVolunteerDailog !: TemplateRef<any>;  

  constructor(public home: HomeService, private router: Router, public dialog: MatDialog) {}

  async ngOnInit() {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;

    const userId = Number(user?.loginid); // Optional chaining to handle null user

    // Fetch user info and then load favorites
    await this.home.GetUserinfoByLoginId(userId);
    this.loadFavorites();
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
