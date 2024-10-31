import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-testimonal',
  templateUrl: './testimonal.component.html',
  styleUrls: ['./testimonal.component.css']
})
export class TestimonalComponent implements OnInit {
  Testimonal: FormGroup = new FormGroup({
    login_Id: new FormControl(''),
    case: new FormControl(''),
    status: new FormControl(''),
    feedback: new FormControl(''),
    rating: new FormControl('') // Keep this for storing the rating
  });

  stars: number[] = [1, 2, 3, 4, 5]; // 5 stars
  rating: number = 0; // Current rating

  constructor(public home: HomeService, public admin: AdminService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Initialization code if needed
  }

  setRating(rating: number) {
    this.rating = rating;
    this.Testimonal.patchValue({ rating: rating }); // Update the form control with the selected rating
  }

  save() {
    const tokenString = localStorage.getItem('user');
    let loginId: string | null = null;

    if (tokenString) {
      const token = JSON.parse(tokenString);
      loginId = token.loginid;
    } else {
      console.log('Token not found in local storage.');
    }

    // Ensure loginId is not null or undefined
    if (loginId) {
      this.Testimonal.patchValue({ login_Id: loginId, status: 'Pending' });
    } else {
      console.log('loginId is null or undefined');
    }

    console.log('Form data before saving:', this.Testimonal.value);

    // Check if form is valid before submitting
    if (this.Testimonal.valid) {
      this.home.CreateTestimonial(this.Testimonal.value);
    } else {
      console.log('Form is invalid:', this.Testimonal.errors);
    }

    // Trigger change detection manually
    this.cd.detectChanges();
  }
}
