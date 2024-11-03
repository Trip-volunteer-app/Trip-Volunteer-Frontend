/// <reference types="@types/google.maps" />
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../../Services/location.service';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
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

  constructor(public location: LocationService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    console.log('Map component initialized');
  }

  // Add a marker on map click
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
