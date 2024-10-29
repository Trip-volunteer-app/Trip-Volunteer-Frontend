import { Component,AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private router:Router){}

  isCollapsed = false;
  isCollapse = false;
  isCollaps = false;

  menu = true;


  toggleSidebar() {
    this.menu = !this.menu;
}
  logout(){
    this.router.navigate(['security/login']);
    localStorage.clear();

  }

}
