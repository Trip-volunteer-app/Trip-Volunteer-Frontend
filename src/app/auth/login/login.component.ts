import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor() {}

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

  onLogin(): void {
    // Here you can handle the login logic
    if (this.email && this.password) {
      alert('Logged in successfully!');
      // Further login validation or redirection logic
    } else {
      alert('Please fill in your credentials.');
    }
  }
}
