import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationdetails:any=[];
  locationByTripID:any={};
  locationsWithTripId:any=[];

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
      } else {
        this.locationdetails = res.results[0]?.formatted_address || 'Address not found';
      }
    } catch (error) {
    }
  }

  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }
  CreateLocation(body: any){
    this.http.post('https://localhost:7004/api/Location/CREATElocation/', body).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Create!',
          text: 'The location has been created successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while Created the location. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  async GetLocationByTripId(id: number) : Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/Location/GetLocationByTripId/'+ id).toPromise();
      this.locationByTripID= res;
    } catch (error) {
    }
  }
  
  UpdateAbout(body:any){
    this.http.put('https://localhost:7004/api/Location/UPDATElocation',body).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Update About!',
          text: 'The Update About element has been successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while updating the element. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  async GetAllLocationsWithTripId() : Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/Location/GetAllLocationsWithTripId').toPromise();
      this.locationsWithTripId = res;
    } catch (error) {
    }
  }
}