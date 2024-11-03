import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationdetails:any=[];

  constructor(private http: HttpClient) {}
  async getLocationInfo(latitude: number, longitude: number): Promise<void> {
    try {
      const res: any = await this.http
        .get(`https://localhost:7004/api/Location_Api/get-location-info?latitude=${latitude}&longitude=${longitude}`)
        .toPromise();
  
      const meaningfulAddress = res.results.find((result: any) =>
        !result.formatted_address.includes('+') &&
        result.address_components.some((component: any) =>
          component.types.includes('route') ||
          component.types.includes('locality') ||
          component.types.includes('neighborhood')
        )
      );
  
      if (meaningfulAddress) {
        this.locationdetails = meaningfulAddress.formatted_address;
        console.log(this.locationdetails);
      } else {
        this.locationdetails = res.results[0]?.formatted_address || 'Address not found';
        console.log('No meaningful address found.');
      }
    } catch (error) {
      console.error('Error fetching location info:', error);
    }
  }
  CreateLocation(body: any){
    this.http.post('https://localhost:7004/api/Location/CREATElocation/', body).subscribe(
      (response) => {
        console.log('Created successfully');
      },
      (err) => {
        console.error('Error occurred while creating', err);
      }
    );
  }
}  