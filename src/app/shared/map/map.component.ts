import { Component } from '@angular/core';
import { LocationService } from 'src/app/Services/location.service';
import { Router } from '@angular/router';

/// <reference types="@types/google.maps" />

interface TripMarker {
  position: google.maps.LatLngLiteral;
  tripId: number;
  tripName: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 31.6000, lng: 37.0000 };
  zoom = 8;
  locationArray: any[] = [];
  markers: TripMarker[] = [];

  constructor(
    private router: Router,
    public location: LocationService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.location.GetAllLocationsWithTripId();
    this.locationArray = this.location.locationsWithTripId;
    console.log('this.locationArray', this.locationArray);

    this.markers = this.locationArray.map(location => (
      {
        position: { lat: location.destination_Latitude, lng: location.destination_Longitude },
        tripId: location.trip_Id,
        tripName: location.trip_Name
      }));
  }

  showDetails(tripId: number, trip: {}) {
    console.log(tripId);
    console.log(trip);
    this.router.navigate(['tripDetails/', tripId]);
  }
}