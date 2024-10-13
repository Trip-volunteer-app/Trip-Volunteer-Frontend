import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rememberMe: boolean = true;

  constructor() {}

  ngOnInit(): void {
    
  }

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
      alert("You dont click on Remember me !")
    }

    // You can now perform the form submission or any other logic here
    console.log('Form submitted with:', { email: this.email, password: this.password });
  }
}
