import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


  isCollapsed = false;
  isCollapse = false;
  isCollaps = false;


  constructor(private router: Router, public admin: AdminService) { }

  ngOnInit(): void {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;

    const userId = Number(user.loginid);
    this.admin.GetUserByLoginId(userId);
  }

  userProfile(): void {
    this.router.navigate(['userProfile']);
  }



  menu = true;


  toggleSidebar() {
    this.menu = !this.menu;
  }

  logout() {
    this.router.navigate(['security/login']);
    localStorage.clear();

  }
}