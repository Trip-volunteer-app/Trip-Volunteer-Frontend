import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import this for reactive forms
import { AuthService } from 'src/app/Services/auth.service';
// import { SocialAuthService, SocialUser } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';
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
    // debugger;
    if (this.registerForms.valid) {
      this.auth.Register(this.registerForms.value); 
      console.log('valid form',this.registerForms.value);

    } else {
      console.log('Form is invalid!');
    }
  }

}
















// export class RegisterComponent implements OnInit {
//   registerForms: FormGroup;
//   user: SocialUser;
//   loggedIn: boolean;

//   constructor(private router: Router, public auth: AuthService, private socialAuthService: SocialAuthService) { }

//   ngOnInit(): void {
//     // Initialize form group
//     this.registerForms = new FormGroup({
//       FIRST_NAME: new FormControl('', [Validators.required]),
//       LAST_NAME: new FormControl('', [Validators.required]),
//       EMAIL: new FormControl('', [Validators.required, Validators.email]),
//       PASSWORD: new FormControl('', [Validators.required, Validators.minLength(8)]),
//       REPASSWORD: new FormControl('')
//     });

//     // Call matchError when passwords change
//     this.registerForms.controls['PASSWORD'].valueChanges.subscribe(() => {
//       this.matchError();
//     });
//     this.registerForms.controls['REPASSWORD'].valueChanges.subscribe(() => {
//       this.matchError();
//     });

//     // Subscribe to social login
//     this.socialAuthService.authState.subscribe((user) => {
//       this.user = user;
//       this.loggedIn = (user != null);
//       if (this.loggedIn) {
//         console.log('User is logged in with Google', user);
//         this.registerForms.patchValue({
//           FIRST_NAME: user.firstName,
//           LAST_NAME: user.lastName,
//           EMAIL: user.email
//         });
//       }
//     });
//   }

//   matchError() {
//     if (this.registerForms.controls['PASSWORD'].value === this.registerForms.controls['REPASSWORD'].value) {
//       this.registerForms.controls['REPASSWORD'].setErrors(null);
//     } else {
//       this.registerForms.controls['REPASSWORD'].setErrors({ MissMatch: true });
//     }
//   }

//   Submit() {
//     if (this.registerForms.valid) {
//       this.auth.Register(this.registerForms.value);
//       console.log('Valid form', this.registerForms.value);
//     } else {
//       console.log('Form is invalid!');
//     }
//   }

//   signInWithGoogle(): void {
//     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
//   }

//   signOut(): void {
//     this.socialAuthService.signOut();
//   }
// }
