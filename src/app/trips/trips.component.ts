import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/Services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent  {
  // constructor(public trip:TripsService){}
  // ngOnInit(): void {
  //   this.trip.getALLTrips();
  // }
}
