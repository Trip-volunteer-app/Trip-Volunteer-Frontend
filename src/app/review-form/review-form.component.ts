import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent  {

constructor(public home:HomeService){}

  Review: FormGroup = new FormGroup({
    REVIEW_ID: new FormControl('', Validators.required),
    RATE: new FormControl('', Validators.required),
    FEEDBACK: new FormControl('', Validators.required),
    BOOKING_ID: new FormControl('', Validators.required),
    CREATE_AT: new FormControl('', Validators.required),
    VOLUNTEER_ID: new FormControl('', Validators.required),
    TRIP_ID: new FormControl('', Validators.required)
  })

  save() {
    this.home.CreateReviews(this.Review.value)
  }

}
