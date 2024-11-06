import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
/// <reference types="@types/google.maps" />
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../../Services/location.service';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})

export class CreateTripComponent implements OnInit {
  @ViewChild('departureInput') departureInput!: ElementRef; // Reference to input field
  @ViewChild('destinationInput') destinationInput!: ElementRef; // Reference to input field


  center: google.maps.LatLngLiteral = { lat: 31.9454, lng: 35.9284 }; // Amman coordinates
  zoom = 10;
  departurePosition: any;
  distenationPosition: any;

  markerPositions: {
    departure?: google.maps.LatLngLiteral;
    destination?: google.maps.LatLngLiteral;
  } = {};

  selectedMarker: 'departure' | 'destination' = 'departure';

  location1: any = []; // Holds the geocoding result
  location2: any = [];

    constructor(public admin: AdminService,private router:Router,
      public location: LocationService, private http: HttpClient) {}

      ngOnInit(): void {
    this.admin.getAllCategories();
  }

  firstFormGroup : FormGroup = new FormGroup({ 
    categoryControl: new FormControl ('', Validators.required), // Form control for category selection

  });
  
  secondFormGroup: FormGroup = new FormGroup({ // Fixed the initialization of secondFormGroup
    Trip_Name: new FormControl('', Validators.required),
    Trip_Price: new FormControl('', [Validators.required, Validators.min(0)]),
    Start_Date: new FormControl ('', Validators.required),
    End_Date: new FormControl ('', Validators.required),
    Max_Number_Of_Volunteers: new FormControl ('', [Validators.required, Validators.min(0)]),
    Max_Number_Of_Users: new FormControl ('', [Validators.required, Validators.min(0)]),
    description: new FormControl ('', Validators.required),
  });

  locationFormGroup : FormGroup = new FormGroup({ 
    departure_Location: new FormControl ('', Validators.required),
    destination_Location: new FormControl ('', Validators.required),
    departure_Latitude: new FormControl ('', Validators.required),
    departure_Longitude: new FormControl ('', Validators.required),
    destination_Latitude: new FormControl ('', Validators.required),
    destination_Longitude: new FormControl ('', Validators.required),
  });


  selectedCategoryId: number | null = null;

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.value; // Update selected category on change
    console.log(this.selectedCategoryId); // Log the selected category ID
  }
  validateAndNext(stepper: MatStepper): void {
    // Mark all fields as touched to trigger validation
    this.secondFormGroup.markAllAsTouched();
    
    if (this.secondFormGroup.valid) {
      this.onSubmit();
      stepper.next(); // Navigate to the next step if the form is valid
    }
  }
 
  TripImage:FormGroup = new FormGroup({
    image_Name:new FormControl('',Validators.required),
  })


  uploadImage(file:any){
    if(file.length==0)
      return;
    let fileToUpload=<File>file[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name)
    this.admin.uploadTripImage(formData);
  }
  
   onSubmit(): void {
    if (this.secondFormGroup.valid) {
      const tripData = {
        ...this.secondFormGroup.value,
        Category_Id: this.selectedCategoryId, // Include selected category ID
        image_Name:this.TripImage.value
      };
      this.admin.CreateTrip(tripData);
      console.log('Form Submitted:', tripData);
      // Perform your form submission logic here
    }
  }
  back(){
    this.router.navigate(['admin/TripsInformation']);

  }
  async addMarker(event: google.maps.MapMouseEvent): Promise<void> {
    if (event.latLng) {
      const position = event.latLng.toJSON();
      try {
        if (this.selectedMarker === 'departure') {
          this.markerPositions.departure = position;
          const locationInfo = await this.location.getLocationInfo(position.lat, position.lng);
          this.departurePosition = this.location.locationdetails;
          console.log('Departure location:', this.departurePosition);
        } else if (this.selectedMarker === 'destination') {
          this.markerPositions.destination = position;
          const locationInfo = await this.location.getLocationInfo(position.lat, position.lng);
          this.distenationPosition = this.location.locationdetails;
          console.log('Destination location set');
        }
        console.log(`${this.selectedMarker} location set:`, position);
      } catch (error) {
        console.error('Error setting marker location:', error);
      }
    }
  }

  saveLocations() {
    console.log('Saving locations:', this.markerPositions);
    console.log(this.distenationPosition);
  }

  getGeocodeInfo(address: string, type: 'departure' | 'destination') {
    this.http
      .get(`https://localhost:7004/api/Location_Api/get-geocode-info?Address=${address}`)
      .subscribe(
        (res: any) => {
          const location = {
            lat: res.latitude,
            lng: res.longitude
          };
  
          if (type === 'departure') {
            this.markerPositions.departure = location;
            this.departurePosition = address;
            console.log('Updated departure marker:', location);
          } else if (type === 'destination') {
            this.markerPositions.destination = location;
            this.distenationPosition = address;
            console.log('Updated destination marker:', location);
          }
        },
        (err) => {
          console.error('Error fetching geocode info:', err.status);
        }
      );
  }

  setupDepartureInputListener() {
    fromEvent(this.departureInput.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        const address = this.departureInput.nativeElement.value;
        if (address) {
          this.getGeocodeInfo(address, 'departure'); // Call for departure only
        }
      });
  }
  
  setupDestinationInputListener() {
    fromEvent(this.destinationInput.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        const address = this.destinationInput.nativeElement.value;
        if (address) {
          this.getGeocodeInfo(address, 'destination'); // Call for destination only
        }
      });
    }

  ngAfterViewInit() {
    this.setupDepartureInputListener(); // Start listening for input changes
    this.setupDestinationInputListener(); // Start listening for input changes

  }

  // Triggered on input change for departure location
  onDepartureInputChange(departure: string) {
    if (departure) {
      this.getGeocodeInfo(departure, 'departure'); // Call the API with the current input value
    }
  }
  onDestinationInputChange(destination: string) {
    if (destination) {
      this.getGeocodeInfo(destination, 'destination'); // Call the API with the current input value
    }
}
}