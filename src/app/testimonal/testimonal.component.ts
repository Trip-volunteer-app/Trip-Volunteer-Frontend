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
    rating: new FormControl('')
  });

  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;

  constructor(public home: HomeService, public admin: AdminService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  setRating(rating: number) {
    this.rating = rating;
    this.Testimonal.patchValue({ rating: rating });
  }

  save() {
    const tokenString = localStorage.getItem('user');
    let loginId: string | null = null;

    if (tokenString) {
      const token = JSON.parse(tokenString);
      loginId = token.loginid;
    }

    if (loginId) {
      this.Testimonal.patchValue({ login_Id: loginId, status: 'Pending' });
    }
    if (this.Testimonal.valid) {
      this.home.CreateTestimonial(this.Testimonal.value);
    }
    this.cd.detectChanges();
  }
}
