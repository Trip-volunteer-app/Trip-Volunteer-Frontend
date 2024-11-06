import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input,ViewChild,TemplateRef } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { HomeService } from '../Services/home.service';
import { Router ,ActivatedRoute} from '@angular/router';
import {  FormGroup, FormControl,Validators } from '@angular/forms';
import {MatDialog,MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    public dialog: MatDialog,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public home:HomeService,
    private route: ActivatedRoute,
    private router:Router
  ) {}
  @ViewChild('callBookingDailog') BookingDailog !:TemplateRef<any>;  
  @ViewChild('callAuthDailog') AuthDailog !:TemplateRef<any>;  

  tripId!: number;
  total:number=0

  ngOnInit(): void {
    this.styleService.applyFullHeight(); 

    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('tripId')!;
      console.log("TripId:", this.tripId);
      if (this.tripId) {
        this.home.getTripById(this.tripId); 
      }
    });
    this.BookingTrip.controls['numberOfUser'].valueChanges.subscribe(() => {
      this.updateTotalAmount();
    });

    const userFromStorage = localStorage.getItem("user");
      this.user = userFromStorage ? JSON.parse(userFromStorage) : null;

      this.userId = Number(this.user.loginid);
    this.home.GetVolunteerRoleByTripId(this.tripId);
    this.home.GetBookingByTripId(this.tripId,this.userId);
    this.home.GetVolunteerByTripId(this.tripId,this.userId)
console.log("bookingtripid",this.home.BookingByTripId);
console.log("volunteerbytripid",this.home.VolunteerByTripId);


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
    numberOfUser:new FormControl(1,Validators.required),
    note:new FormControl(''),

  })

 volanteerForm:FormGroup = new FormGroup({
  login_Id:new FormControl('',Validators.required),
  trip_Id:new FormControl('',Validators.required),
  volunteer_Role_Id:new FormControl('',Validators.required),
  email:new FormControl('',Validators.required),
  phone_Number:new FormControl('',Validators.required),
  emergency_Contact:new FormControl('',Validators.required),
  experience:new FormControl(""),
  notes:new FormControl(''),

  })
  
  pData:any={};
  user: any = localStorage.getItem("user");
    userId:number=0;
  dialogRef!: MatDialogRef<any>;

  openBookingDailog(obj:any){
     if(this.user != null){ 
      this.home.GetVolunteerRoleByTripId(this.tripId);
      
      const userFromStorage = localStorage.getItem("user");
      this.user = userFromStorage ? JSON.parse(userFromStorage) : null;

      this.userId = Number(this.user.loginid);

    this.pData=obj; 
    this.BookingTrip.controls['trip_Id'].setValue(this.pData.trip_Id);
    this.BookingTrip.controls['login_Id'].setValue(this.userId);


    //volunteer 
    this.volanteerForm.controls['trip_Id'].setValue(this.pData.trip_Id);
    this.volanteerForm.controls['login_Id'].setValue(this.userId);
    

    this.updateTotalAmount();

    
    this.dialogRef = this.dialog.open(this.BookingDailog, {
      disableClose: true  
    });


    this.dialogRef.afterClosed().subscribe(() => {
      this.clear();
    });
    
   }else{
    this.dialog.open(this.AuthDailog, {
      disableClose: true  
    });

   }}

  selectedService: number[] = [];

  check(isChecked: boolean, id: number) {
    if (isChecked) {
      // Add id to selectedService if it's not already present
      if (!this.selectedService.includes(id)) {
        this.selectedService.push(id);
        
      }
    } else {
      // Remove id from selectedService if unchecked
      this.selectedService = this.selectedService.filter(serviceId => serviceId !== id);
    }
    
    console.log('Selected Service IDs:', this.selectedService);
    this.updateTotalAmount();

  }
 
  
  updateTotalAmount() {
    const tripCost = this.pData.trip_Price;
    const numberOfUsers = this.BookingTrip.controls['numberOfUser'].value;

    // Calculate total service costs based on selected services
    const selectedServiceCosts = this.selectedService.reduce((total, serviceId) => {
      const service = this.pData.services.find((s: any) => s.service_Id === serviceId);
      const serviceCost = service ? service.service_Cost : 0;
      console.log(`Service ID: ${serviceId}, Cost: ${serviceCost}`);
      return total + serviceCost;
    }, 0);

    console.log(`Selected Service Costs: ${selectedServiceCosts}`);

    // Calculate total amount
    const totalAmount = (tripCost + selectedServiceCosts) * numberOfUsers;

    console.log("Trip Cost:", tripCost);
    console.log("Number of Users:", numberOfUsers);
    console.log("Total Amount:", totalAmount);

    this.BookingTrip.controls['total_Amount'].setValue(totalAmount);
  }
  goLogin(){
    this.router.navigate(['security/login']);
  }
  goRegiter(){
    this.router.navigate(['security/register']);
  }
  clear(){
    this.selectedService=[];
    this.BookingTrip.reset();

  }
  bookingreq:any;
  Booking() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with the booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.BookingTrip.valid) {
          
          // Check if there's an existing reservation or volunteer request
          if (this.home.BookingByTripId == null) {
            if (this.home.VolunteerByTripId == null) {
  
              // No existing booking or volunteer request, proceed to create booking
              this.bookingreq = {
                ...this.BookingTrip.value,
                ArrayParam: this.selectedService
              };
              this.home.CreateBooking(this.bookingreq);
              this.dialogRef.close();
  
            } else if (this.home.VolunteerByTripId !== null && this.home.VolunteerByTripId.status?.toLowerCase() === 'pending') {
  
              // Volunteer request is pending, confirm with the user before proceeding
              Swal.fire({
                title: 'You have a pending volunteer request for this trip!',
                text: 'If you proceed with the booking, your volunteer request will be canceled. Do you want to continue?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, book!'
              }).then((volunteerResult) => {
                if (volunteerResult.isConfirmed) {
                  // Cancel volunteer request and proceed with booking
                  this.home.DeleteVolanteerReq(this.home.VolunteerByTripId.volunteer_Id);
                  
                  this.bookingreq = {
                    ...this.BookingTrip.value,
                    ArrayParam: this.selectedService
                  };
                  this.home.CreateBooking(this.bookingreq);
                  this.dialogRef.close();
                }
              });
            } else {
              // Volunteer status is not 'pending'
              Swal.fire({
                icon: 'warning',
                title: 'You already have a volunteer reservation for this trip',
                text: 'Please check your reservations.',
              });
            }
          } else {
            // User already has a booking on this trip
            Swal.fire({
              icon: 'warning',
              title: 'You already have a booking for this trip',
              text: 'Please check your reservations.',
            });
          }
          
        } else {
          // Form validation failed
          Swal.fire({
            icon: 'warning',
            title: 'Incomplete Form',
            text: 'Please complete all required fields in the booking form.',
          });
        }
      }
    });
  }
  
  
 


  volunteerBooking(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with the booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.volanteerForm.valid) {
        
            if (this.home.VolunteerByTripId == null) {
              if (this.home.BookingByTripId == null) {
    
                // No existing booking or volunteer request, proceed to create booking
                this.home.BookingVolunteer(this.volanteerForm.value)
                this.dialogRef.close(); 
    
              } else if (this.home.BookingByTripId !== null && this.home.BookingByTripId.payment_Status.toLowerCase() == 'not paid') {
    
                // Volunteer request is pending, confirm with the user before proceeding
                Swal.fire({
                  title: 'You have a reservation not paid for this trip!',
                  text: 'If you proceed with the booking volunteer request, your reservation will be canceled. Do you want to continue?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, book!'
                }).then((volunteerResult) => {
                  if (volunteerResult.isConfirmed) {
  
                    this.home.Deletebooking(this.home.BookingByTripId.booking_Id)
                    // User confirmed to proceed with booking, override volunteer request
                    this.home.BookingVolunteer(this.volanteerForm.value)
                    this.dialogRef.close(); 
                  }
                });
              }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'You already have a reservation for this trip',
                  text: 'Please check your reservations.',
                });
              }
            } else {
              // User already has a booking on this trip
              Swal.fire({
                icon: 'warning',
                title: 'You already have a reservation as volanteer for this trip',
                text: 'Please check your reservations.',
              });
            }
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Incomplete Form',
            text: 'Please complete all required fields in the volunteer form.',
          });
        }
      }
    });  }
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


