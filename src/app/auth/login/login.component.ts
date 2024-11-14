import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators,FormGroup,FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private recaptchaSiteKey = '6LfZuXwqAAAAALrLkIWcx2WT5nKuaU0-59aQhjfV'; 

  loginForm!: FormGroup;


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

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private toastr: ToastrService,
    private http: HttpClient,
    private rout:Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({email: ['', Validators.required],password: ['', Validators.required],});
    if (typeof grecaptcha !== 'undefined') {
      setTimeout(() => {
        grecaptcha.render('recaptcha', {
          'sitekey': '6LfZuXwqAAAAALrLkIWcx2WT5nKuaU0-59aQhjfV'
        });
      }, 0);
    }



    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail) this.email = storedEmail;
    if (storedPassword) this.password = storedPassword;
  }
  
  recaptchaResponse: string='';

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
    console.log('Form submitted with:', { email: this.email, password: this.password, rememberMe: this.rememberMe,recaptchaResponse: this.recaptchaResponse });
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
      this.showVerificationDialog = false; 
      this.showNewPasswordDialog = true; 
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

onRecaptchaVerified(response: string): void {
  this.recaptchaResponse = response; 
  this.login(); 
}

  

  
  login() {
    const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    this.toastr.error('Please verify that you\'re not a robot');
    return;
  }
    if (this.Email.valid && this.Password.valid) {
      const emailValue = this.Email.value;
      const passwordValue = this.Password.value;
      console.log('befor call auth');
      

      this.auth.login(emailValue, passwordValue, recaptchaResponse);
      console.log('after call auth');

      console.log("emailpassword", emailValue, passwordValue, recaptchaResponse);
    } else {
      this.toastr.error('Please enter valid email and password');
    }
  }


  loadRecaptcha(): void {
    if (document.getElementById('recaptcha-script')) return;

    const script = this.renderer.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.id = 'recaptcha-script';
    script.async = true;
    script.defer = true;

    this.renderer.appendChild(document.head, script);

    script.onload = () => {
      grecaptcha.render('recaptcha', {
        'sitekey': this.recaptchaSiteKey
      });
    };
  }
}



