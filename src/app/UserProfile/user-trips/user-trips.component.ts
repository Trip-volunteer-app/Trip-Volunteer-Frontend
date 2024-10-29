import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  isLoggedIn: boolean = false;
  email: string | null = null;
  first_Name: string | null = null;
  last_Name: string | null = null;
  image_Path: File | null = null;

  constructor(public admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn && this.email) {
      this.getUserData(this.email);
    }
  }

  getUserData(email: string): void {
    this.admin.getUserData(email).subscribe(data => {
      if (data && data.length > 0) {
        const user: any = data[0];
        this.email = user.email; 
        this.first_Name = user.first_Name;
        this.last_Name = user.last_Name;
      }
    });
  }

  checkLoginStatus(): void {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!(email && token);
    this.email = email;
  }

  YourTripsAndFavorites(): void {
    this.router.navigate(['userProfile']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['security/login']);
  }
}
