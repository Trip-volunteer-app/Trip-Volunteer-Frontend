import { Component, OnInit,ViewChild,TemplateRef, ElementRef} from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
/// <reference types="@types/google.maps" />
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/Services/location.service';

@Component({
  selector: 'app-manage-trips',
  templateUrl: './manage-trips.component.html',
  styleUrls: ['./manage-trips.component.css']
})
export class ManageTripsComponent implements OnInit{
  @ViewChild('callCreateDailog') CreateDailog !:TemplateRef<any>;  
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  
  @ViewChild('callLocationEditDialog') EditLocationDailog !:TemplateRef<any>; 
  @ViewChild('departureInput') departureInput!: ElementRef; // Reference to input field
  @ViewChild('destinationInput') destinationInput!: ElementRef;
  locationData: any ={};

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

  tripId!: number; 
  constructor(
    public admin:AdminService,
    public location:LocationService,
    public dialog: MatDialog,
    private router:Router,
    private route: ActivatedRoute,
    private http: HttpClient)
  {}

  async ngOnInit(): Promise<void> {
    
    this.route.paramMap.subscribe(async params => {
      this.tripId = +params.get('tripId')!;
      console.log("TripId:", this.tripId);
      if (this.tripId) {
        this.admin.GetTripById(this.tripId);
        this.admin.GetServicesByTripID(this.tripId);
        await this.location.GetLocationByTripId(this.tripId);
        this.departurePosition = this.location.locationByTripID.departure_Location;
        this.distenationPosition= this.location.locationByTripID.destination_Location;
        console.log(this.admin.tripServices);
        this.markerPositions.departure = {
          lat: this.location.locationByTripID.departure_Latitude,
          lng: this.location.locationByTripID.departure_Longitude
        };
        
        this.markerPositions.destination = {
          lat: this.location.locationByTripID.destination_Latitude,
          lng: this.location.locationByTripID.destination_Longitude
        };
      }
    });
  }
  back(){
    this.router.navigate(['admin/TripsInformation']);

  }
 
  openImages(tripId:number){
    this.router.navigate(['admin/ManageImages/', tripId]);

  }

  openDeleteDialog(id:number){
    console.log(id)
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result != undefined){
      if(result == 'yes')
        this.admin.DeleteTrip(id);
      else if(result == 'no')
        console.log('Thank you ');
        
    }
  })
  }

  UpdateTrips:FormGroup = new FormGroup({
    trip_Id:new FormControl('',Validators.required),
    trip_Name:new FormControl('',Validators.required),
    trip_Price:new FormControl('',Validators.required),
    start_Date:new FormControl('',Validators.required),
    end_Date:new FormControl('',Validators.required),
    max_Number_Of_Users:new FormControl('',Validators.required),
    max_Number_Of_Volunteers:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    category_Id:new FormControl('',Validators.required),
    trip_Location_Id:new FormControl('',Validators.required)
  })

  pData:any={};

  openEditDailog(obj:any){
    this.pData=obj; 
    this.UpdateTrips.controls['trip_Id'].setValue(this.pData.trip_Id)
    this.UpdateTrips.controls['category_Id'].setValue(this.pData.category_Id)
    this.UpdateTrips.controls['trip_Location_Id'].setValue(this.pData.trip_Location_Id);
    if (this.pData.end_Date) {
      this.pData.end_Date = new Date(this.pData.end_Date).toISOString().split('T')[0];
    }
    if (this.pData.start_Date) {
      this.pData.start_Date = new Date(this.pData.start_Date).toISOString().split('T')[0];
    }
    this.dialog.open(this.EditDailog)
  }

  save2(){
    console.log(this.UpdateTrips.value);

    this.admin.UpdateTrip(this.UpdateTrips.value)
  }

  editLocationFormGroup: FormGroup = new FormGroup({
    location_Id: new FormControl('', Validators.required),
    departure_Location: new FormControl('', Validators.required),
    destination_Location: new FormControl('', Validators.required),
    departure_Latitude: new FormControl('', Validators.required),
    departure_Longitude: new FormControl('', Validators.required),
    destination_Latitude: new FormControl('', Validators.required),
    destination_Longitude: new FormControl('', Validators.required),
  });

  openlocationEditDailog(obj:any){
    this.pData=obj; 
    this.editLocationFormGroup.controls['location_Id'].setValue(this.pData.location_Id)
    this.dialog.open(this.EditLocationDailog)

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
          console.log(this.markerPositions)
        }
        this.updateFormGroup();
        console.log(`${this.selectedMarker} location set:`, position);
      } catch (error) {
        console.error('Error setting marker location:', error);
      }
    }
  }
  updateFormGroup() {
    if (this.markerPositions.departure) {
      this.editLocationFormGroup.patchValue({
        departure_Latitude: this.markerPositions.departure.lat,
        departure_Longitude: this.markerPositions.departure.lng,
      });
    }
    if (this.markerPositions.destination) {
      this.editLocationFormGroup.patchValue({
        destination_Latitude: this.markerPositions.destination.lat,
        destination_Longitude: this.markerPositions.destination.lng,
      });
    }
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
  updateLocation(){
    console.log('formformformformformform',this.editLocationFormGroup.value)
    this.location.UpdateAbout(this.editLocationFormGroup.value);
  }
}

