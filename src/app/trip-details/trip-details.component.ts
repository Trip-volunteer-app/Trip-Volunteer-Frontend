import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input,ViewChild,TemplateRef } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { HomeService } from '../Services/home.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public home:HomeService,
    private route: ActivatedRoute,
    private router:Router,public dialog: MatDialog
  ) {}
  @ViewChild('callBookingDailog') BookingDailog !:TemplateRef<any>;  
  @ViewChild('callAuthDailog') AuthDailog !:TemplateRef<any>;  

  tripId!: number;

  ngOnInit(): void {
    this.styleService.applyFullHeight(); 

    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('tripId')!;
      console.log("TripId:", this.tripId);
      if (this.tripId) {
        this.home.getTripById(this.tripId);
      }
    });
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

  isFavorite: boolean = false; // Track whether the item is a favorite

  toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Toggle the favorite state
  }

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.home.tripDetails.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.home.tripDetails.images.length) % this.home.tripDetails.images.length;
  }

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }

  BookingTrip:FormGroup = new FormGroup({
    trip_Id:new FormControl('',Validators.required),
    login_Id:new FormControl('',Validators.required),
    total_Amount:new FormControl('',Validators.required),
    numberOfUser:new FormControl('',Validators.required),
    note:new FormControl('',Validators.required),

  })


  pData:any={};
  userId: number | null = Number(localStorage.getItem("loginid")) || null;
  selectedServices: number[] = [];
  
  openBookingDailog(obj:any){
     if(this.userId != null){ 

    this.pData=obj; 
    this.BookingTrip.controls['trip_Id'].setValue(this.pData.trip_Id)
    this.BookingTrip.controls['login_Id'].setValue(this.userId)
    if (this.pData.end_Date) {
      this.pData.end_Date = new Date(this.pData.end_Date).toISOString().split('T')[0];
    }
    if (this.pData.start_Date) {
      this.pData.start_Date = new Date(this.pData.start_Date).toISOString().split('T')[0];
    }
    this.dialog.open(this.BookingDailog)
   }else{
    this.dialog.open(this.AuthDailog); 

   }
  }
  goLogin(){
    this.router.navigate(['security/login']);
  }
  goRegiter(){
    this.router.navigate(['security/register']);
  }
  Booking(){
    
  }



  reviews = [
    {
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
      name: 'John Doe',
      rating: 4,
      feedback: 'Great trip, very well organized and fun!'
    },
    {
      avatarUrl: 'https://m.media-amazon.com/images/M/MV5BNTc3N2EyNWItOTIwNC00ZTZmLWFlM2QtM2QzMjY2MWEzNzNjXkEyXkFqcGc@._V1_.jpg',
      name: 'Jane Smith',
      rating: 5,
      feedback: 'An amazing experience, I highly recommend it!'
    },
  ];
  showMoreReviews() {
  }

  displayedColumns: string[] = ['name', 'location'];
  
  previousTrips = [
    { id: 1, name: 'Trip to Petra', location: 'Petra, Jordan' },
    { id: 2, name: 'Desert Safari', location: 'Wadi Rum, Jordan' },
    { id: 3, name: 'Exploring Amman', location: 'Amman, Jordan' },
    { id: 4, name: 'Historical Jerash', location: 'Jerash, Jordan' },
    { id: 5, name: 'Visit to Aqaba', location: 'Aqaba, Jordan' },
    { id: 6, name: 'Dead Sea Retreat', location: 'Dead Sea, Jordan' },
    { id: 7, name: 'Ajloun Castle Tour', location: 'Ajloun, Jordan' },
    { id: 8, name: 'Mount Nebo Visit', location: 'Mount Nebo, Jordan' },
    { id: 9, name: 'Dana Biosphere Reserve', location: 'Dana, Jordan' },
    { id: 10, name: 'Kerak Castle Expedition', location: 'Kerak, Jordan' },
  ];

  goToTripDetails(tripId: number) {
    console.log(`Navigating to trip details for trip ID: ${tripId}`);
    // Implement the logic to navigate to the trip details
  }
}
