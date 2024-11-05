import { Component } from '@angular/core';
import { LocationService } from 'src/app/Services/location.service';
import { Router } from '@angular/router';

/// <reference types="@types/google.maps" />

// Define a custom interface for markers to include position and tripId
interface TripMarker {
  position: google.maps.LatLngLiteral;
  tripId: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 31.6000, lng: 37.0000 }; // Amman coordinates
  zoom = 8;
  locationArray: any[] = [];
  
  // Use the custom TripMarker type for markers
  markers: TripMarker[] = [];

  constructor(
    private router: Router,
    public location: LocationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.location.GetAllLocationsWithTripId();
    this.locationArray = this.location.locationsWithTripId;
    console.log('this.locationArray', this.locationArray);
    
    // Map the location data to markers array including tripId for each marker
    this.markers = this.locationArray.map(location => ({
      position: { lat: location.destination_Latitude, lng: location.destination_Longitude },
      tripId: location.trip_Id // Assuming `tripId` is available in each location object
    }));
  }

  // Navigate to the trip details page for the selected trip
  showDetails(tripId: number,trip:{}) {
    console.log(tripId);
    console.log(trip);

    this.router.navigate(['tripDetails/', tripId]);
  }
}
