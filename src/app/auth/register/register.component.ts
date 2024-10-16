import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import this for reactive forms
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,public auth:AuthService) {}

  registerForms: FormGroup = new FormGroup({
    FIRST_NAME: new FormControl('', [Validators.required]),
    LAST_NAME: new FormControl('', [Validators.required]),  // Updated placeholder
    EMAIL: new FormControl('', [Validators.required, Validators.email]),
    // PhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),  // Example validation for phone number
    PASSWORD: new FormControl('', [Validators.required, Validators.minLength(8)]),
    REPASSWORD: new FormControl('')
  });

  ngOnInit(): void {
    // Call matchError when passwords change
    this.registerForms.controls['PASSWORD'].valueChanges.subscribe(() => {
      this.matchError();
    });
    this.registerForms.controls['REPASSWORD'].valueChanges.subscribe(() => {
      this.matchError();
    });
  }

  matchError() {
    if (this.registerForms.controls['PASSWORD'].value === this.registerForms.controls['REPASSWORD'].value) 
      {
        console.log('no error in password match');
      this.registerForms.controls['REPASSWORD'].setErrors(null);
    } else {
      console.log('error in password match');
      this.registerForms.controls['REPASSWORD'].setErrors({ MissMatch: true });
    }
  }

  Submit() {
    if (this.registerForms.valid) {
      this.auth.Register(this.registerForms.value); 
      console.log('valid form',this.registerForms.value);

    } else {
      console.log('Form is invalid!');
    }
  }

}
