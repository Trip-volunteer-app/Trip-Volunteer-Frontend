import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { TripsService } from '../Services/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public trip:TripsService
  ) {}

  ngOnInit(): void {
    this.styleService.applyFullHeight(); // Apply full height initially
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
  images = [
    { src: 'https://flowtraveljo.com/wp-content/uploads/2023/04/Ajloun-Castle.jpeg', alt: 'Image 1' },
    { src: 'https://nebotours.com/wp-content/uploads/2021/12/sites-ajloun.jpg', alt: 'Image 2' },
    { src: 'https://enjoy-jordan.com/wp-content/uploads/2024/05/ajloun-arabiaweather-3-4-2024-jtb-1024x680.webp', alt: 'Image 3' },
    { src: 'https://atlastours.net/wp-content/uploads/2022/06/ajloun_castle-1.jpg', alt: 'Image 4' }
  ];
  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
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
