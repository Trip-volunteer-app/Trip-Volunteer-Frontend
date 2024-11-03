import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { StyleService } from '../Services/style.service';
import { MatDialog } from '@angular/material/dialog';
import { TestimonalComponent } from '../testimonal/testimonal.component';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit, AfterViewInit {
  constructor(
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Fetch contact data during initialization
    this.home.GetSelectedAboutus();
    console.log(this.home.GetSelectedAboutus());
    this.styleService.applyFullHeight(); // Apply full height initially
    this.home.GetAcceptedTestimonies();

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


}

