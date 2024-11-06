import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { HomeService } from '../Services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { TestimonalComponent } from '../testimonal/testimonal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit , AfterViewInit {

  constructor(   
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public router: Router
  ) {}


  ngOnInit(): void {
    this.styleService.applyFullHeight(); // Apply full height initially
    this.home.GetSelectedAboutus();
    this.home.GetAcceptedTestimonies();
    this.home.GetSelectedHomeElement();
    this.home.getTopRatedTrips();

  }

  ngAfterViewInit(): void {
    // Initialize various styles and functionalities after view initialization
    this.styleService.applyFullHeight(); // Ensure height recalculates
    this.styleService.initCarousels(); // Initialize carousels
    this.styleService.handleDropdownHover(); // Manage dropdown hover effects
    this.styleService.handleScrollAnimations(); // Set up scroll-based animations
    this.styleService.initCounters(); // Initialize counters
    this.styleService.initContentAnimations(); // Apply content animations
    this.styleService.initMagnificPopup(); // Set up image popups
    this.styleService.initDatePickers(); // Initialize date pickers
    this.cdr.detectChanges(); // Detect changes after all initializations
  }


  isTokenPresent(): boolean {
    return !!localStorage.getItem('token'); // Returns true if the token exists, false otherwise
}
  openTestimonialDialog(){
    this.dialog.open(TestimonalComponent);
  }
  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', differenceInDays);
    return differenceInDays;
  }
  showDetails(tripId:number){
    this.router.navigate(['tripDetails/',tripId]);
  }
}
