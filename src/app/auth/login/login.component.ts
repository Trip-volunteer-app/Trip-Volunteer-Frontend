import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators,FormGroup,FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
// import {SocialAuthService,GoogleLoginProvider,SocialUser} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

  // socialUser!: SocialUser;

  isLoggedin?: boolean;


  
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;
  showForgotPasswordDialog: boolean = false;
  showVerificationDialog: boolean = false;
  showNewPasswordDialog: boolean = false;
  verificationCode: string = '';
  generatedCode: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  Email: FormControl = new FormControl('');
  Password: FormControl = new FormControl('');

  // Email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  // Password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private toastr: ToastrService,
    private http: HttpClient,
    private rout:Router,
    private formBuilder: FormBuilder,
    // private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({email: ['', Validators.required],password: ['', Validators.required],});

    // this.socialAuthService.authState.subscribe((user) => {

    //   this.socialUser = user;

    //   this.isLoggedin = user != null;

    //   console.log(this.socialUser);

    // });


    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail) this.email = storedEmail;
    if (storedPassword) this.password = storedPassword;
  }

  onSubmit(): void {
    if (this.rememberMe) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
    console.log('Form submitted with:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
  }

  openForgotPasswordDialog() {
    this.showForgotPasswordDialog = true;
  }

  closeForgotPasswordDialog() {
    this.showForgotPasswordDialog = false;
  }


  submitForgotPassword() {
    if (this.email) {
      this.http.post('https://localhost:7004/api/PasswordReset/send-reset-email', { email: this.email })
        .subscribe((response: any) => {  
          console.log('Email sent successfully');
          console.log(this.email);
          localStorage.setItem('Email', this.email);
  
          this.generatedCode = response.verificationCode;
          console.log('Verification code:', this.generatedCode); 
          this.showForgotPasswordDialog = false; 
          this.showVerificationDialog = true; 
        }, error => {
          console.error('Error sending email', error);
          this.toastr.error('Error sending email. Please try again.');
        });
    }
  }

  

  submitVerificationCode() {
    if (this.verificationCode === this.generatedCode) {
      this.showVerificationDialog = false; // Hide verification dialog
      this.showNewPasswordDialog = true; // Show new password dialog
    } else {
      alert("Invalid verification code. Please try again.");
    }
  }



  resetPassword() {
  
    if (this.newPassword !== this.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const emailFromLocal = localStorage.getItem('Email');
  
    if (!emailFromLocal) {
      alert("No email found in local storage. Please log in again.");
      return;
    }
  
    this.auth.updatePassword(emailFromLocal, this.newPassword).subscribe(response => {
      window.location.reload();
      this.toastr.success('Password updated successfully! Login please ');
    }, error => {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    });
  }
  
  

  
  login() {
    if (this.Email.valid && this.Password.valid) {
      const emailValue = this.Email.value;
      const passwordValue = this.Password.value;
      console.log('befor call auth');
      

      this.auth.login(emailValue, passwordValue);
      console.log('after call auth');

      console.log("emailpassword", emailValue, passwordValue);
    } else {
      this.toastr.error('Please enter valid email and password');
    }
  }


  loginWithGoogle(): void {

    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  logOut(): void {

    // this.socialAuthService.signOut();

  }
}



