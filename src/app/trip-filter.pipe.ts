import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilter'
})
export class TripFilterPipe implements PipeTransform {
  transform(trips: any[], trip_Name: string, checkInDate: Date | null, checkOutDate: Date | null, minPrice: number | null, maxPrice: number | null): any[] {
    if (!trips || trips.length === 0) return [];

    return trips.filter(trip => {
      const matchesPlace = trip_Name ? trip.trip_Name.toLowerCase().includes(trip_Name.toLowerCase()) : true;

      const matchesCheckIn = checkInDate ? new Date(trip.start_Date) >= new Date(checkInDate) : true;

      const matchesCheckOut = checkOutDate ? new Date(trip.end_Date) <= new Date(checkOutDate) : true;

      const matchesPrice = minPrice !== null ? trip.trip_Price >= minPrice : true;

      const matchesMaxPrice = maxPrice !== null ? trip.trip_Price <= maxPrice : true;

      return matchesPlace && matchesCheckIn && matchesCheckOut && matchesPrice && matchesMaxPrice;
    });
  }
}
