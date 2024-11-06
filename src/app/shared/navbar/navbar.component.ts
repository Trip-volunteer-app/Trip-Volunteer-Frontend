import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  isLoggedIn: boolean = false;

  constructor(private router:Router,public admin:AdminService){}

  ngOnInit(): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    if (user) {
      this.isLoggedIn = true;
      const userId = Number(user.loginid);

      this.admin.GetUserByLoginId(userId);
    }
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















