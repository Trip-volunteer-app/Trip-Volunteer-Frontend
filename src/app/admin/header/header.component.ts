import { Component,AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isCollapsed = false;
  isCollapse = false;
  isCollaps = false;



  constructor(private router:Router){}
  logout(){
    this.router.navigate(['security/login']);
    localStorage.clear();

  }

}
