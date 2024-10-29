import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isLoggedIn: boolean = false;

  login_Id :number |null= null;
  email: string | null = null;
  first_Name: string | null = null;
  last_Name: string | null = null;
  image_Path: File | null = null;
  date_Register: Date | null = null;
  address: string | null = null;
  phone_Number: string | null = null;
  birth_Date: Date | null = null;
  password: string | null = null;
  repassword: string | null = null;
  user_Id: number | null = null;
  role_Id: number | null = null;


  Users: FormGroup = new FormGroup({
    login_id: new FormControl(''),
    first_Name: new FormControl(''),
    last_Name: new FormControl(''),
    phone_Number: new FormControl(''),
    address: new FormControl(''),
    birth_Date: new FormControl(''),
    image_Path: new FormControl(''),
    user_id: new FormControl('')
  });

  constructor(public admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.Users = new FormGroup({
      login_id: new FormControl(this.login_Id),
      first_Name: new FormControl(this.first_Name),
      last_Name: new FormControl(this.last_Name),
      phone_Number: new FormControl(this.phone_Number),
      address: new FormControl(this.address),
      birth_Date: new FormControl(this.birth_Date),
      image_Path: new FormControl(this.image_Path),
      user_id: new FormControl(this.user_Id)
    });
  }
  

  checkLoginStatus(): void {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!(email && token);
    this.email = email;

    if (email && token) {
      this.isLoggedIn = true;
      this.getUserData(email);
    } else {
      this.isLoggedIn = false;
    }
  }

  pData: any = {};

  getUserData(email: string): void {
    this.admin.getUserData(email).subscribe(data => {
      if (data && data.length > 0) {
        const user: any = data[0];
        this.pData = { ...user };  // Store original data for comparison
        this.login_Id = user.login_Id;
        this.email = user.email; 
        this.first_Name = user.first_Name;
        this.last_Name = user.last_Name;
        this.image_Path = user.image_Path;
        this.date_Register = user.date_Register;
        this.address = user.address;
        this.phone_Number = user.phone_Number;
        this.birth_Date = user.birth_Date;
  
        // Initialize the form with fetched data
        this.Users.setValue({
          login_id: this.login_Id,
          first_Name: this.first_Name,
          last_Name: this.last_Name,
          phone_Number: this.phone_Number,
          address: this.address,
          birth_Date: this.birth_Date,
          image_Path: this.image_Path,
          user_id: this.user_Id
        });
      }
    });
  }
  

  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      this.image_Path = event.target.files[0];
    }
  }

  saveProfile() {  
    const updatedData: any = {};
  
    Object.keys(this.Users.controls).forEach(key => {
      if (this.Users.get(key)?.value !== this.pData[key]) {
        updatedData[key] = this.Users.get(key)?.value;
      }
    });
  
    if (Object.keys(updatedData).length > 0) {
      this.admin.updateUserData(updatedData);
    }
  }
  

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['security/login']);
  }
}
