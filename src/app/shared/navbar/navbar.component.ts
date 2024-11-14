import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  roleID: string | null = '';

  constructor(private router: Router, public admin: AdminService, public home: HomeService) { }
  ngOnInit(): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    if (user) {
      this.isLoggedIn = true;
      const userId = Number(user.loginid);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      this.roleID = userData?.Roleid;
      this.admin.GetUserByLoginId(userId);
    }

    const userId = Number(user?.loginid);

    if (userId !== null) {
      this.home.GetUserinfoByLoginId(userId);
    }
  }

  hasUnpaidBookings: boolean = false
  private checkUnpaidBookings(bookings: any[]) {
    this.hasUnpaidBookings = bookings.some(booking => booking.payment_Status !== 'paid');
  }

  userProfile(): void {
    this.router.navigate(['userProfile']);
  }

  UserTrips(): void {
    this.router.navigate(['UserTrips']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['security/login']);
  }

  AdminProfile() {
    this.router.navigate(['admin/AdminProfile']);
  }
}