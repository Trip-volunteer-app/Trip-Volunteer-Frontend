import { Component,AfterViewInit,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  email: string | null = null;
  first_Name :string | null = null
  last_Name :string | null = null
  userImage: string | null = null;


  
  isCollapsed = false;
  isCollapse = false;
  isCollaps = false;

  constructor(private router:Router,private admin:AdminService){}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!(email && token);
    this.email = email; 

    if (email && token) {
      this.isLoggedIn = true;
      this.email = email;
      this.getUserData(email); 
    } else {
      this.isLoggedIn = false;
    }

  }

  getUserData(email: string): void {
    this.admin.getUserData(email).subscribe(data => {
      if (data && data.length > 0) {
        const user: any = data[0];
        console.log(user);
        this.userImage = user.imageUrl; 
        this.first_Name = user.first_Name;
        this.last_Name=user.last_Name;
      }
    });
  }

  userProfile():void
  {
    this.router.navigate(['userProfile']);
  }


  logout(){
    this.router.navigate(['security/login']);
    localStorage.clear();

  }

}











