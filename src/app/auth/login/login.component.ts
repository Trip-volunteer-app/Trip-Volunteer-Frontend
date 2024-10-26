import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    private rout:Router
  ) {}

  ngOnInit(): void {
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
        .subscribe(response => {
          console.log('Email sent successfully');
          console.log(this.email);
          localStorage.setItem('Email',this.email);
          this.generatedCode = this.generateVerificationCode(); // Generate and store verification code
          console.log('Verification code:', this.generatedCode); // Log for testing; remove in production
          this.showForgotPasswordDialog = false; // Close the dialog
          this.showVerificationDialog = true; // Open the verification dialog
        }, error => {
          console.error('Error sending email', error);
          this.toastr.error('Error sending email. Please try again.');
        });
    }
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
    // Ensure that both password fields match
    if (this.newPassword !== this.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Retrieve the email from localStorage
    const emailFromLocal = localStorage.getItem('Email');
  
    // Check if email is not null
    if (!emailFromLocal) {
      alert("No email found in local storage. Please log in again.");
      return;
    }
  
    // Use the email inputted by the user to update the password
    this.auth.updatePassword(emailFromLocal, this.newPassword).subscribe(response => {
      // alert("Password updated successfully!");
      // this.rout.navigate(['security/login']);
      window.location.reload();
      this.toastr.success('Password updated successfully! Login please ');
      // Optionally, close the dialog or navigate to another view
    }, error => {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    });
  }
  
  

  
  login() {
    if (this.Email.valid && this.Password.valid) {
      const emailValue = this.Email.value;
      const passwordValue = this.Password.value;
      console.log('**************************');
      

      this.auth.login(emailValue, passwordValue);
      console.log('after call auth');

      console.log("emailpassword", emailValue, passwordValue);
    } else {
      this.toastr.error('Please enter valid email and password');
    }
  }
}
