import { Component,EventEmitter,Input, Output } from '@angular/core';
import { TripsService } from '../Services/trips.service';

@Component({
  selector: 'app-trips-card',
  templateUrl: './trips-card.component.html',
  styleUrls: ['./trips-card.component.css']
})
export class TripsCardComponent {
  constructor(private trip:TripsService){}
@Input() tripObj:any;
@Output() openDetails= new EventEmitter();

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }
  goToDetails(){
    this.trip.selectedTrip=this.tripObj;
    this.openDetails.emit();
  }
}
