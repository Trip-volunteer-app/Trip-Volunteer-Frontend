import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripVolunteerFilter'
})
export class TripVolunteerFilterPipe implements PipeTransform {



  transform(volunteers: any[], first_Name: string, last_Name: string, trip_Name: string, role_Name: string ): any[] {
    if (!volunteers || volunteers.length === 0) return [];

    return volunteers.filter(volunteers => {
      const matchesPlace = first_Name ? volunteers.first_Name.toLowerCase().includes(first_Name.toLowerCase()) : true;

      const matchesCheckIn = last_Name ? volunteers.last_Name.toLowerCase().includes(last_Name.toLowerCase()) : true;

      const matchesCheckOut = trip_Name ? volunteers.trip_Name.toLowerCase().includes(trip_Name.toLowerCase()) : true;

      const matchesPrice = role_Name ? volunteers.role_Name.toLowerCase().includes(role_Name.toLowerCase()) : true;


      return matchesPlace && matchesCheckIn && matchesCheckOut && matchesPrice ;
    });
  }

}
