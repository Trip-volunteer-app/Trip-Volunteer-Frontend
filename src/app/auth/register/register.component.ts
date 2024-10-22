import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) {}

  registerForms: FormGroup = new FormGroup({
    FIRST_NAME: new FormControl('', [Validators.required]),
    LAST_NAME: new FormControl('', [Validators.required]),
    EMAIL: new FormControl('', [Validators.required, Validators.email]),
    Address: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]), 
    PASSWORD: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/(?=.*[A-Z])/)]),
    REPASSWORD: new FormControl('')
  });



  ngOnInit(): void {
    // Call matchError when passwords change
    this.registerForms.controls['PASSWORD'].valueChanges.subscribe(() => {
      this.matchError();
    });

    this.registerForms.controls['PASSWORD'].valueChanges.subscribe(() => {
      this.validatePassword();
    });


    this.registerForms.controls['REPASSWORD'].valueChanges.subscribe(() => {
      this.matchError();
    });
  }

  matchError() {
    const password = this.registerForms.controls['PASSWORD'].value;
    const repassword = this.registerForms.controls['REPASSWORD'].value;

    if (password === repassword) {
      console.log('no error in password match');
      this.registerForms.controls['REPASSWORD'].setErrors(null);
    } else {
      console.log('error in password match');
      this.registerForms.controls['REPASSWORD'].setErrors({ MissMatch: true });
    }
  }

 
  validatePassword() {
    const password = this.registerForms.controls['PASSWORD'].value;
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    

    if (!hasSpecialChar) {
      this.registerForms.controls['PASSWORD'].setErrors({ noSpecialChar: true });
    } else {
      this.registerForms.controls['PASSWORD'].setErrors(null);
    }
  }

  Submit() {
    if (this.registerForms.valid) {
      this.auth.Register(this.registerForms.value);
      console.log('valid form', this.registerForms.value);
    } else {
      console.log('Form is invalid!');
    }
  }
}
