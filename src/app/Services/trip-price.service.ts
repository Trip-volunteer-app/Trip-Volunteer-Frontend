import { Injectable } from '@angular/core';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root'
})
export class TripPriceService {

  constructor() { home: HomeService }
  tripsWithCalculatedPrice: any;
  async calculateTripPrice(trips: any[]) {
    this.tripsWithCalculatedPrice = trips.map(trip => {
      const totalServiceCost = trip.tripServiceDTO.reduce(
        (total: number, service: any) =>
          total + (service.service_Cost ? service.service_Cost : 0),
        0
      );
      return { ...trip, trip_Price: totalServiceCost };
    });
    console.log('Trips with calculated prices:', this.tripsWithCalculatedPrice);
  }
  tripDetailsWithCalculatedPrice: any;
  async calculateTripPriceForASingleTrip(trip: any): Promise <number>{
     const totalServiceCost =await trip.services.reduce((total: number, service: any) => {
      return total + (service.service_Cost ? service.service_Cost : 0);
    }, 0);
    trip.trip_Price = totalServiceCost;
    this.tripDetailsWithCalculatedPrice=trip;
    return totalServiceCost;
  }


}