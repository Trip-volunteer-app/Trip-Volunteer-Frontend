import { Component, OnInit } from '@angular/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rememberMe: boolean = true; // Initialized to true
  showForgotPasswordDialog: boolean = false; // New variable to control dialog visibility


  constructor(public dialog: MatDialog) {}

  onSubmit(): void {
    if (this.rememberMe) {
      // Save email, password, and rememberMe status in localStorage
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      // Clear stored data if 'Remember me' is unchecked
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
      alert("You don't click on Remember me!");
    }
    alert('Login successfully');
    console.log('Form submitted with:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
  }

  ngOnInit(): void {
    // Retrieve values from localStorage and assign to the form fields
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail) {
      this.email = storedEmail;
    }
    if (storedPassword) {
      this.password = storedPassword;
    }
  }


    
  openForgotPasswordDialog() {
    this.showForgotPasswordDialog = true; // Show the dialog
  }

  closeForgotPasswordDialog() {
    this.showForgotPasswordDialog = false; // Hide the dialog
  }

  // openForgotPasswordDialog() {
  //   this.dialog.open(ForgotPasswordComponent, {
  //     panelClass: 'custom-dialog-container',  // Apply the custom CSS class
  //     width: '400px',  // Optional: Adjust the width
  //     height: '200px'  // Optional: Adjust the height
  //   });
  // }
   
}










