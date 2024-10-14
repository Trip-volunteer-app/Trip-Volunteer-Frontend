import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { HomeService } from '../Services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit , AfterViewInit {

  constructor(   
<<<<<<< HEAD

=======
>>>>>>> 35575aa606e0a6d69aa059e4bb5e1502a520767d
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.styleService.applyFullHeight(); // Apply full height initially
    this.home.GetAllAboutUsElements();
<<<<<<< HEAD

    this.isViewInitialized = true;
    this.styleService.applyFullHeight(); // Apply height initially
=======
>>>>>>> 35575aa606e0a6d69aa059e4bb5e1502a520767d
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
}
