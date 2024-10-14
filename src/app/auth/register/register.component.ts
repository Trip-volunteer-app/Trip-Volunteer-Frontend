import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rememberMe: boolean = true; // Initialized to true

  constructor() {}

  ngOnInit(): void {}

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
    alert('Register successfully');
    console.log('Form submitted with:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
  }
}
