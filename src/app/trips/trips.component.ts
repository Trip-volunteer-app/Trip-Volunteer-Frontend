import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../Services/home.service';
import { LocationService } from '../Services/location.service';

import { FormsModule } from '@angular/forms';
import { MoveFilterDataService } from '../Services/move-filter-data.service';
import { AdminService } from '../Services/admin.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, AfterViewInit {

@Output() openDetails= new EventEmitter();



  trip_Name: string = '';
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  minPrice: number | null = null; 
  maxPrice: number | null = null; 

 
 
    first_Name: string = '';
    last_Name: string = '';
    // trip_Name: string = '';
    role_Name: string = '';

    tripData: any = {};

    activeTab: string = 'trip';


  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public Trip:HomeService,
    private router:Router,
    private route: ActivatedRoute,
    public location:LocationService,
    public home:HomeService,
    public admin: AdminService,
    private tripDataService: MoveFilterDataService
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

    this.activeTab = this.tripDataService.getActiveTab();

    this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] || 'trip';
    });
    
    this.route.queryParams.subscribe((params) => {
      this.first_Name = params['first_Name'] || '';
      this.last_Name = params['last_Name'] || '';
      this.trip_Name = params['trip_Name'] || '';
      this.role_Name = params['role_Name'] || '';
    });

    this.route.queryParams.subscribe((params) => {
      this.trip_Name = params['trip_Name'] || '';
      this.checkInDate = params['checkInDate'] || '';
      this.checkOutDate = params['checkOutDate'] || '';
      this.minPrice = params['minPrice'] || null;
      this.maxPrice = params['maxPrice'] || null;
    });
    this.styleService.applyFullHeight(); // Apply full height initially
    this.Trip.getALLTrips();
    this.location.GetAllLocationsWithTripId();
    console.log("ddd",this.Trip.Trips)
    console.log("Trip",this.Trip.Trips)
    this.home.AllVolunteersWithTrips();
    console.log("AllVolunteersWithTrip",this.home.AllVolunteersWithTrip);

    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
  
    const userId = Number(user?.loginid);
    this.home.GetUserinfo(userId).subscribe(
      (userDataArray) => {      
          this.checkUnpaidBookings(userDataArray);
      },
      (error) => {
        console.error("Failed to retrieve user information", error);
      }
    );
    
  }

  hasUnpaidBookings:boolean=false;
  private checkUnpaidBookings(bookings: any) {
    this.hasUnpaidBookings = bookings.bookings.some(
     ( booking:any )=> booking.payment_Status && booking.payment_Status.toLowerCase() !== 'paid'
    );
  }
  goPayment(){
    this.router.navigate(['UserTrips']);

  }
  selectTab(tab: string): void {
    this.activeTab = tab;
    this.tripDataService.setActiveTab(tab);
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


