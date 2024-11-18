import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input, ViewChild, TemplateRef, } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { HomeService } from '../Services/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { TripPriceService } from '../Services/trip-price.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    public dialog: MatDialog,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public home: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public tripsWithPrice: TripPriceService,

  ) { }
  @ViewChild('callBookingDailog') BookingDailog!: TemplateRef<any>;
  @ViewChild('callAuthDailog') AuthDailog!: TemplateRef<any>;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  tripId!: number;
  total: number = 0;
  volunteerRolesWithVolunteers: any[] = [];
  tripPrice: number=0;

  async ngOnInit() {
    this.styleService.applyFullHeight();

    this.route.paramMap.subscribe(params => {
      this.tripId = +params.get('tripId')!;
      this.home.getTripByIdWithOptionalServices(this.tripId)
      if (this.tripId) {
        this.home.getTripById(this.tripId).subscribe(async tripDetails => {
          this.home.tripDetails = tripDetails;
          await this.tripsWithPrice.calculateTripPriceForASingleTrip(tripDetails);
          console.log('tripDetailsWithCalculatedPrice', this.tripsWithPrice.tripDetailsWithCalculatedPrice)
          this.tripPrice= this.tripsWithPrice.tripDetailsWithCalculatedPrice.trip_Price;
          this.total=this.tripPrice;
          console.log( this.tripPrice)
          if (this.home.tripDetails.category_Id) {
            await this.home.GetReviewByCategoryId(this.home.tripDetails.category_Id);

            await this.home.GetSimilarTrips(this.home.tripDetails.category_Id);

          }
        });

        this.home.GetTripVolunteers(this.tripId);
        this.home.GetVolunteerRoleByTripId(this.tripId);
      } else {
      }
    });

    const userFromStorage = localStorage.getItem("user");
    this.user = userFromStorage ? JSON.parse(userFromStorage) : null;
    this.userId = Number(this.user?.loginid);

    if (this.tripId && this.userId) {
      this.home.GetBookingByTripId(this.tripId, this.userId);
      this.home.GetVolunteerByTripId(this.tripId, this.userId);
    }
  }


  isFutureTrip(startDate: string): boolean {
    const currentDate = new Date();
    const tripStartDate = new Date(startDate);

    return tripStartDate > currentDate;
  }
  initializeForm() {
    this.BookingTrip = this.fb.group({
      trip_Id: new FormControl('', Validators.required),
      login_Id: new FormControl('', Validators.required),
      numberOfUser: [{ value: '', disabled: !this.isSeatsAvailable() }],
      total_Amount: [{ value: this.tripPrice, disabled: !this.isSeatsAvailable() }],
      note: [{ value: '', disabled: !this.isSeatsAvailable() }],
    });
  }

  updateFormState() {
    if (!this.isSeatsAvailable()) {
      this.BookingTrip.disable();
    } else {
      this.BookingTrip.enable();
    }
  }

  isSeatsAvailable(): boolean {
    const seatsAvailable = this.home.tripDetails.max_Number_Of_Users > 0;
    return seatsAvailable;
  }
  ngAfterViewInit(): void {
    this.styleService.applyFullHeight();
    this.styleService.initCarousels();
    this.styleService.handleDropdownHover();
    this.styleService.handleScrollAnimations();
    this.styleService.initCounters();
    this.styleService.initContentAnimations();
    this.styleService.initMagnificPopup();
    this.styleService.initDatePickers();
    this.cdr.detectChanges();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.some(
      (favorite: any) => favorite.bookingId === this.home.tripDetails.bookingId
    );
  }

  isFavorite: boolean = false;

  toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex(
      (favorite: any) => favorite.bookingId === this.home.tripDetails.bookingId
    );

    if (index > -1) {
      favorites.splice(index, 1);
      this.isFavorite = false;
    } else {
      favorites.push({
        tripId: this.home.tripDetails.trip_Id,
        name: this.home.tripDetails.trip_Name,
        price: this.home.tripDetails.trip_Price,
        startDate: this.home.tripDetails.start_Date,
        endDate: this.home.tripDetails.end_Date,
        location: this.home.tripDetails.destination_Location,
      });
      this.isFavorite = true;
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  currentSlide = 0;

  nextSlide() {
    this.currentSlide =
      (this.currentSlide + 1) % this.home.tripDetails.images.length;
  }
  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.home.tripDetails.images.length) %
      this.home.tripDetails.images.length;
  }

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }

  BookingTrip: FormGroup = new FormGroup({
    trip_Id: new FormControl('', Validators.required),
    login_Id: new FormControl('', Validators.required),
    total_Amount: new FormControl(''),
    numberOfUser: new FormControl(1, [Validators.required, this.nonZeroValidator()]),
    note: new FormControl(''),
  });

  nonZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value > 0 ? null : { nonZero: true };
    };
  }


  volanteerForm: FormGroup = new FormGroup({
    login_Id: new FormControl('', Validators.required),
    trip_Id: new FormControl('', Validators.required),
    volunteer_Role_Id: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone_Number: new FormControl('', Validators.required),
    emergency_Contact: new FormControl('', Validators.required),
    experience: new FormControl(''),
    notes: new FormControl(''),
  });

  pData: any = {};
  user: any = localStorage.getItem('user');
  userId: number = 0;
  dialogRef!: MatDialogRef<any>;

  totalVolunteers: number = 0;
  isVolunteerAvailable: boolean = false;
  initializeVolunteerForm() {
    this.volanteerForm = this.fb.group({
      login_Id: new FormControl('', Validators.required),
      trip_Id: new FormControl('', Validators.required),
      volunteer_Role_Id: new FormControl('', Validators.required),
      email: [{ value: '', disabled: !this.isVolunteerRole() }],
      phone_Number: [{ value: '', disabled: !this.isVolunteerRole() }],
      emergency_Contact: [{ value: '', disabled: !this.isVolunteerRole() }],
      experience: [{ value: '', disabled: !this.isVolunteerRole() }],
      notes: [{ value: '', disabled: !this.isVolunteerRole() }],
    });
  }


  async updateVolunteerFormState() {
    const isVolunteerFormVisible = await this.isVolunteerRole();

    if (!isVolunteerFormVisible) {
      this.volanteerForm.disable();
    } else {
      this.volanteerForm.enable();
    }
  }

  async isVolunteerRole(): Promise<boolean> {
    try {
      const roles: any[] = await this.home.GetRoleByTripId(this.tripId).toPromise();

      this.totalVolunteers = roles.reduce(
        (sum, role) => sum + (role.number_Of_Volunteers || 0),
        0
      );

      this.isVolunteerAvailable = this.totalVolunteers > 0;
      return this.isVolunteerAvailable;
    } catch (err) {
      return false;
    }
  }


  async openBookingDailog(obj: any) {
    if (this.user != null) {
      this.home.GetRoleByTripId(this.tripId).subscribe((roles: any[]) => {
        this.volunteerRolesWithVolunteers = roles.filter(
          (role) => role.number_Of_Volunteers > 0
        );

      });
      const userFromStorage = localStorage.getItem('user');
      this.user = userFromStorage ? JSON.parse(userFromStorage) : null;

      this.userId = Number(this.user.loginid);

      if (!this.isSeatsAvailable()) {
        this.initializeForm();
        this.updateFormState();
      }
      const isVolunteerFormVisible = await this.isVolunteerRole();
      if (!isVolunteerFormVisible) {
        this.initializeVolunteerForm();
        this.updateVolunteerFormState();
      }

      this.pData = obj;
      this.BookingTrip.controls['trip_Id'].setValue(this.pData.trip_Id);
      this.BookingTrip.controls['login_Id'].setValue(this.userId);

      this.volanteerForm.controls['trip_Id'].setValue(this.pData.trip_Id);
      this.volanteerForm.controls['login_Id'].setValue(this.userId);

      this.updateTotalAmount();

      this.dialogRef = this.dialog.open(this.BookingDailog, {
        disableClose: true,
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.clear();
      });
    } else {
      this.dialog.open(this.AuthDailog, {
        disableClose: true,
      });
    }
  }

  check(isChecked: boolean, id: number) {
    if (isChecked) {
      if (!this.selectedService.includes(id)) {
        this.selectedService.push(id);
      }
    } else {
      this.selectedService = this.selectedService.filter(
        (serviceId) => serviceId !== id
      );
    }

    this.updateTotalAmount();
  }

  updateTotalAmount() {
    const tripCost = this.tripPrice;
    const numberOfUsers = this.BookingTrip.controls['numberOfUser'].value;

    const selectedServiceCosts = this.selectedService.reduce(
      (total, serviceId) => {
        const service = this.pData.services.find(
          (s: any) => s.service_Id === serviceId
        );
        const serviceCost = service ? service.service_Cost : 0;
        return total + serviceCost;
      },
      0
    );
    const totalAmount = (this.tripPrice + selectedServiceCosts) * numberOfUsers;
    console.log('totalAmount', totalAmount)
    this.BookingTrip.controls['total_Amount'].setValue(totalAmount);
  }
  goLogin() {
    this.router.navigate(['security/login']);
  }
  goRegiter() {
    this.router.navigate(['security/register']);
  }
  clear() {
    this.selectedService = [];
    this.BookingTrip.reset();
  }
  selectedService: number[] = [];
  bookingreq: any;
  Booking() {
    if (this.home.BookingByTripId == null) {
      if (this.home.VolunteerByTripId == null ||
        (this.home.VolunteerByTripId !== null &&
          this.home.VolunteerByTripId.status?.toLowerCase() === 'rejected')) {

        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to proceed with the booking?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, book it!',
        }).then((result) => {
          if (result.isConfirmed) {
            const maxUser = this.BookingTrip.controls['numberOfUser'].value;
            if (this.home.tripDetails.max_Number_Of_Users >= maxUser) {
              this.bookingreq = {
                ...this.BookingTrip.value,
                ArrayParam: this.selectedService,
              };
              this.home.CreateBooking(this.bookingreq);
              this.dialogRef.close();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Not enough seats',
                text: 'Sorry, there are not enough available seats for this trip. Please adjust the number of users or choose another trip.',
              });
            }
          } else {
            this.dialogRef.close();
          }
        });
      } else if (this.home.VolunteerByTripId !== null &&
        this.home.VolunteerByTripId.status?.toLowerCase() === 'pending') {
        Swal.fire({
          title: 'You have a pending volunteer request for this trip!',
          text: 'If you proceed with the booking, your volunteer request will be canceled. Do you want to continue?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, book!',
        }).then((volunteerResult) => {
          if (volunteerResult.isConfirmed) {
            const maxUser = this.BookingTrip.controls['numberOfUser'].value;
            if (this.home.tripDetails.max_Number_Of_Users >= maxUser) {
              this.home.DeleteVolanteerReq(this.home.VolunteerByTripId.volunteer_Id);

              this.bookingreq = {
                ...this.BookingTrip.value,
                ArrayParam: this.selectedService,
              };
              this.home.CreateBooking(this.bookingreq);
              this.dialogRef.close();
            }
          } else {
            this.dialogRef.close();
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'You already have a volunteer reservation for this trip',
          text: 'Please check your reservations.',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You already have a booking for this trip',
        text: 'Please check your reservations.',
      });
    }
  }

  volunteerBooking() {
    if (this.volanteerForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to proceed with the booking?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, book it!',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.volanteerForm.valid) {
            if (this.home.VolunteerByTripId == null) {
              if (this.home.BookingByTripId == null) {
                this.home.BookingVolunteer(this.volanteerForm.value);
                this.dialogRef.close();
              } else if (
                this.home.BookingByTripId !== null &&
                this.home.BookingByTripId.payment_Status.toLowerCase() ==
                'not paid'
              ) {
                Swal.fire({
                  title: 'You have a reservation not paid for this trip!',
                  text: 'If you proceed with the booking volunteer request, your reservation will be canceled. Do you want to continue?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, book!',
                }).then((volunteerResult) => {
                  if (volunteerResult.isConfirmed) {
                    this.home.Deletebooking(this.home.BookingByTripId.booking_Id);
                    this.home.BookingVolunteer(this.volanteerForm.value);
                    this.dialogRef.close();
                  } else {
                    this.dialogRef.close();
                  }
                });
              } else {
                Swal.fire({
                  icon: 'warning',
                  title: 'You already have a reservation for this trip',
                  text: 'Please check your reservations.',
                });
              }
            } else {
              Swal.fire({
                icon: 'warning',
                title:
                  'You already have a reservation as volanteer for this trip',
                text: 'Please check your reservations.',
              });
            }
          }
        }

      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please complete all required fields in the volunteer form.',
      });
    };

  }

  goToTripDetails(tripId: number) {
    this.router.navigate(['tripDetails/', tripId]);
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = 0;
    }
  }
}
