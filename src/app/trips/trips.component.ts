import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../Services/home.service';
import { LocationService } from '../Services/location.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, AfterViewInit {

@Output() openDetails= new EventEmitter();


activeTab: string = 'trip'; // Default to 'trip' tab

selectTab(tab: string) {
  this.activeTab = tab;
}

  trip_Name: string = '';
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  minPrice: number | null = null; 
  maxPrice: number | null = null; 

 
 
    first_Name: string = '';
    last_Name: string = '';
    // trip_Name: string = '';
    role_Name: string = '';


  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public Trip:HomeService,
    private router:Router,
    private route: ActivatedRoute,
    public location:LocationService,
    public home:HomeService
  ) {}
 

  // searchVolunteers() {
  //   this.home.searchVolunteers(this.searchCriteria).subscribe(
  //     (response) => {
  //       this.volunteers = response;  // Update the volunteers list with search results
  //     },
  //     (error) => {
  //       console.error('Error fetching volunteers:', error);
  //     }
  //   );
  // }

  ngOnInit(): void {


    this.styleService.applyFullHeight(); // Apply full height initially
    this.Trip.getALLTrips();
    this.location.GetAllLocationsWithTripId();
    console.log("ddd",this.Trip.Trips)
    console.log("Trip",this.Trip.Trips)
    this.home.AllVolunteersWithTrips();
    console.log("AllVolunteersWithTrip",this.home.AllVolunteersWithTrip);

  }

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }
  currentPage: number = 1;
  cardsPerPage: number = 12;

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

  showDetails(tripId:number){
    this.router.navigate(['tripDetails/',tripId]);
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
