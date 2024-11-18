import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators,AbstractControl  } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/Services/location.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private toastr: ToastrService, public location :LocationService) {}


  registerForms: FormGroup = new FormGroup({
    FIRST_NAME: new FormControl('', [Validators.required]),
    LAST_NAME: new FormControl('', [Validators.required]),
    EMAIL: new FormControl('', [Validators.required, Validators.email]),
    Address: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]), 
    PASSWORD: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*_-]).*$/)]),
    REPASSWORD: new FormControl('')
  });
  


  ngOnInit(): void {
    this.registerForms.controls['PASSWORD'].valueChanges.subscribe(() => {
      this.matchError();
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



  Submit() {
    if (this.registerForms.valid) {
      this.auth.Register(this.registerForms.value);
      console.log('valid form', this.registerForms.value);

    } else {
      console.log('Form is invalid!');
    }
  }
  onAddressFocus() {
    this.location.getCurrentLocation()
      .then(position => {
        const { latitude, longitude } = position.coords;
        this.fetchAddressFromCoordinates(latitude, longitude);
      })
      .catch(error => {
        alert("Location access was denied or an error occurred.");
        console.error(error);
      });
  }

  async fetchAddressFromCoordinates(lat: number, lon: number) {
    await this.location.getLocationInfo(lat, lon)
        this.registerForms.patchValue({ Address: this.location.locationdetails });

  }
}
