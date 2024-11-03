import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;

  login_Id :string |null= null;
  email: string | null = null;
  first_Name: string | null = null;
  last_Name: string | null = null;
  image_Path: File | null = null;
  date_Register: string | null = null;
  address: string | null = null;
  phone_Number: string | null = null;
  birth_Date: Date | null = null;
  password: string | null = null;
  repassword: string | null = null;
  user_Id: string | null = null;
  role_Id: string | null = null;


  constructor(public admin: AdminService, private router: Router,public toastr: ToastrService) {}

  Users: FormGroup = new FormGroup({
    login_Id: new FormControl(''),
    email:new FormControl(''),
    first_Name: new FormControl(''),
    last_Name: new FormControl(''),
    phone_Number: new FormControl(''),
    address: new FormControl(''),
    birth_Date: new FormControl(''),
    image_Path: new FormControl(''),
    user_Id: new FormControl(''),
    date_Register: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    role_Id: new FormControl('')
  });


  changePassword: FormGroup = new FormGroup({
    logiN_ID: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  changedPassword() {
    // Retrieve the entire Users form value
    const usersFormValue = this.Users.value;
  
    // Now extract login_Id
    const loginIdValue = usersFormValue.login_Id;
    console.log("loginIdValue:",loginIdValue)
    if (loginIdValue) {
      // Create a payload for the API
      const payload = {
        logiN_ID: loginIdValue,
        oldPassword: this.changePassword.get('oldPassword')?.value,
        newPassword: this.changePassword.get('newPassword')?.value,
        confirmPassword: this.changePassword.get('confirmPassword')?.value
      };
  
      console.log("Payload for Change Password:", payload);
  
      // Make the API call
      this.admin.changePassword(payload);
    }
  }
  
 


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
      // this.admin.getUserData(email);
      this.getUserData(email);
      
      
    } else {
      this.isLoggedIn = false;
    }
  }

  pData: any = {};

  isDataLoaded: boolean = false;

  getUserData(email: string): void {
    this.admin.getUserData(email).subscribe(data => {
      if (data && data.length > 0) {
        const user: any = data[0];
        this.pData = { ...user }; 

        // console.log("pData in get User Data",this.pData);
        
        if (this.pData.birth_Date) {
          this.pData.birth_Date = new Date(this.pData.birth_Date).toISOString().split('T')[0];
        }
        
        if (this.pData.date_Register) {
          this.pData.date_Register = new Date(this.pData.date_Register).toISOString().split('T')[0];
        }
        
        // Assign user data to component properties
        this.login_Id = user.login_Id;
        this.email = user.email; 
        this.first_Name = user.first_Name;
        this.last_Name = user.last_Name;
        this.image_Path = user.image_Path;
        this.date_Register = user.date_Register;
        this.address = user.address;
        this.phone_Number = user.phone_Number;
        this.birth_Date = user.birth_Date;
        this.role_Id = user.role_Id;
        this.user_Id = user.user_Id;
        this.repassword = user.repassword;
        this.password = user.password;
        // console.log("user_id",this.user_Id);

        // Set the values in the Users form group
        this.Users.controls['login_Id'].setValue(user.login_Id);
        this.Users.controls['user_Id'].setValue(user.user_Id);
        this.Users.controls['role_Id'].setValue(user.role_Id);
 
        
        this.isDataLoaded = true;

      }
    });
  }
  
   


  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      this.image_Path = event.target.files[0];
    }
  }

  saveProfile(): void {
    if (!this.isDataLoaded) {
      // console.error("Data not loaded yet.");
      return; // Prevent saveProfile from running if data is not loaded
    }
    const fileData = new FormData();
    if (this.image_Path) {
      fileData.append('image_Path', this.image_Path);
    }
  
    // Call the update service with current form values
    this.admin.updateUserData(this.Users.value);
    

  }


  isPasswordFormVisible: boolean = false; // Controls visibility of the form
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  togglePasswordForm() {
    this.isPasswordFormVisible = !this.isPasswordFormVisible;
  }

  YourTripsAndFavorites(): void {
    this.router.navigate(['UserTrips']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['security/login']);
  }
}


 