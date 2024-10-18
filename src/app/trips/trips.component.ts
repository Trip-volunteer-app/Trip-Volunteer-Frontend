import { TripsService } from 'src/app/Services/trips.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, AfterViewInit {

@Output() openDetails= new EventEmitter();

  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public Trip:TripsService,
    private router:Router,
    private route: ActivatedRoute
  ) {}
 

  ngOnInit(): void {
    this.styleService.applyFullHeight(); // Apply full height initially
    this.Trip.getALLTrips();
  }

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }
  currentPage: number = 1;
  cardsPerPage: number = 9;

  get totalPages(): number {
    return Math.ceil(this.Trip.Trips.length / this.cardsPerPage);
  }

  getPaginatedTrips() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.Trip.Trips.slice(start, start + this.cardsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  showDetails(){
    this.router.navigate(['tripDetails']);
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
