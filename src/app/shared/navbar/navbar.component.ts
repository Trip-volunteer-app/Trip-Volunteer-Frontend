import { Component,OnInit } from '@angular/core';
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

  constructor(private router:Router,public admin:AdminService,public home:HomeService){}

  ngOnInit(): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    if (user) {
      this.isLoggedIn = true;
      const userId = Number(user.loginid);

      this.admin.GetUserByLoginId(userId);
    }
  
    const userId = Number(user?.loginid);

    if (userId !== null) {
      this.home.getUserinfoByLoginIdForReview(userId).subscribe((userInfo: any) => {
        if (userInfo.bookings && userInfo.bookings.length > 0) {
          this.checkUnpaidBookings(userInfo.bookings);
        } else {
          console.error('No bookings found for user');
        }
      });
    } else {
      console.error('Login ID is null');
    }
    }


    hasUnpaidBookings:boolean =false
    private checkUnpaidBookings(bookings: any[]) {
      this.hasUnpaidBookings = bookings.some(booking => booking.payment_Status !== 'paid');
   }

  userProfile():void
  {
    this.router.navigate(['userProfile']);
  }

  UserTrips():void
  {
    this.router.navigate(['UserTrips']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false; 
    this.router.navigate(['security/login']);
  }




}















