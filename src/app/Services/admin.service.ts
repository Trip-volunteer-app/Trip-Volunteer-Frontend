import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { error } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public pieChartLabels: string[] = ['Accepted', 'Pending', 'Rejected'];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';
  constructor(public http: HttpClient, public toastr: ToastrService) { }

  // Categories
  Categories: any = [];
  getAllCategories() {
    this.http.get('https://localhost:7004/api/categories/GetAllcategories').subscribe(result => {
      this.Categories = result;
    }, err => {
    })
  }
  CreateCategories(body: any) {
    body.image = this.display_Image;
    this.http.post('https://localhost:7004/api/categories/CREATEcategories', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Categories!',
        text: 'The Categories has been Created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllCategories();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the categories. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }


  DeleteCategories(id: number) {
    this.http.delete('https://localhost:7004/api/categories/Deletecategories/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Categories has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllCategories();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the categories. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }


  updateCategories(body: any) {
    this.http.put('https://localhost:7004/api/categories/UPDATEcategories', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'update!',
        text: 'The Categories has been updating successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllCategories();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updateing the categories. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  // Services
  Services: any = [];
  sortedServices = [];
  async getAllServices(): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/Service').toPromise();
      this.Services = res;
      this.sortedServices = this.Services.sort((a: any, b: any) => (b.service_Id - a.service_Id));
    } catch (error) {
    }
  }

  CreateServices(body: any) {
    this.http.post('https://localhost:7004/api/Service/CreateService', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Services!',
        text: 'The Services has been Created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllServices();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while creating the categories. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteServices(id: number) {
    this.http.delete('https://localhost:7004/api/Service/DeleteService/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Services has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllServices();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Services. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  updateServices(body: any) {
    this.http.put('https://localhost:7004/api/Service/UpdateService', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'update Services!',
        text: 'The Services has been updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updated the Services. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  // VolunteerRole
  VolunteerRole: any = [];
  getAllVolunteerRole() {
    this.http.get('https://localhost:7004/api/VolunteerRoles/GetAllVolunteerRoles').subscribe(result => {
      this.VolunteerRole = result;
    }, err => {
    })
  }

  VolunteerRoles: any = [];
  SortedVolunteerRoles = [];
  async getAllVolunteerRoles(): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/VolunteerRoles/GetAllVolunteerRoles').toPromise();
      this.VolunteerRoles = res;
      this.SortedVolunteerRoles = this.VolunteerRoles.sort((a: any, b: any) => (b.volunteer_Role_Id - a.volunteer_Role_Id));
    } catch (error) {
    }
  }

  async CreateVolunteerRoles(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/VolunteerRoles/CreateVolunteerRole', body).toPromise();
    } catch (error) {
    }
  }

  CreateVolunteerRole(body: any) {
    this.http.post('https://localhost:7004/api/VolunteerRoles/CreateVolunteerRole', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Volunteer Role!',
        text: 'The Volunteer Role has been created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteVolunteerRole(id: number) {
    this.http.delete('https://localhost:7004/api/VolunteerRoles/DeleteVolunteerRole/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Volunteer Role has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  updateVolunteerRole(body: any) {
    this.http.put('https://localhost:7004/api/VolunteerRoles/UpdateVolunteerRole', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'success!',
        text: 'The Volunteer Role has been updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  tripVolunteers: any = [];
  async GetVolunteerRoleByTripID(trip_Id: number): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/VolunteerRoles/GetRoleByTripID/${trip_Id}`).toPromise();
      this.tripVolunteers = res;
    } catch (error) {
    }
  }

  async CreateTripVRoleForVRolesList(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/TripVolunteerrole/CreateTripVRoleForVRolesList', body).toPromise();
    } catch (error) {
    }
  }

  async UpdateTrip_vrole_NumberOfVolunteers(body: any): Promise<void> {
    try {
      await this.http.put('https://localhost:7004/api/TripVolunteerrole/UpdateTrip_vrole_NumberOfVolunteers', body).toPromise();
    } catch (error) {
    }
  }

  async CreateVolunteerRoleForTrip(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/VolunteerRoles/CreateVolunteerRoleForTrip', body).toPromise();
    } catch (error) {
    }
  }

  // Volunteer
  Volunteer: any = [];
  getAllVolunteer() {
    this.http.get('https://localhost:7004/api/Volunteers/GetAllVolunteers').subscribe(result => {
      this.Volunteer = result;
    }, err => {
    })
  }

  getAllVolunteers() {
    return this.http.get<any[]>('https://localhost:7004/api/Volunteers/GetAllVolunteers');
  }

  DeleteVolunteer(id: number) {
    this.http.delete('https://localhost:7004/api/Volunteers/DeleteVolunteer/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Volunteer has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllVolunteer();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Volunteer. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  UpdateVolunteerStatus(volunteer: any): Observable<any> {
    return this.http.put('https://localhost:7004/api/Volunteers/UpdateVolunteerStatus', volunteer);
  }
  updateVolunteer(volunteer: any): Observable<any> {
    return this.http.put('https://localhost:7004/api/Volunteers/UpdateVolunteer', volunteer);
  }
  sendEmail(emailData: any): Observable<any> {
    return this.http.post('https://localhost:7004/api/Volunteers/send-email', emailData);
  }

  updateNumberOfVolunteer(volunteer: any) {
    this.http.put<void>('https://localhost:7004/api/TripVolunteerrole/updateNumberOfVolunteer', volunteer).subscribe(
      result => {
      },
      err => {
      }
    );
  }

  // Trip Services
  TripServices: any = [];
  getAllTripServices() {
    this.http.get('https://localhost:7004/api/serviceTripe/GetAllTripServices').subscribe(result => {
      this.TripServices = result;
    }, err => {
    })
  }


  CreateTripServices(body: any) {
    this.http.post('https://localhost:7004/api/serviceTripe/CreateTripService', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Trip Services!',
        text: 'The Trip Services has been created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripServices();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the Trip Services. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteTripServices(id: number) {
    this.http.delete('https://localhost:7004/api/serviceTripe/DeleteTripService/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Create Trip Services!',
        text: 'The Trip Services has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripServices();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleted the Trip Services. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  updateTripServices(body: any) {
    this.http.put('https://localhost:7004/api/serviceTripe/UpdateTripService', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'update Trip Services!',
        text: 'The Trip Services has been updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripServices();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updated the Trip Services. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  // Review
  Review: any = [];
  getAllReview() {
    this.http.get('https://localhost:7004/api/Review').subscribe(result => {
      this.Review = result;
    }, err => {
    })
  }

  DeleteReview(id: number) {
    this.http.delete('https://localhost:7004/api/Review/DeleteReview' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Review has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllReview();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Review. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  // Trip Volunteer Role
  TripVolunteerRole: any = [];
  getAllTripVolunteerRole() {
    this.http.get('https://localhost:7004/api/TripVolunteerrole/GetAlltrip_volunteerRoles').subscribe(result => {
      this.TripVolunteerRole = result;
    }, err => {
    })
  }

  CreateTripVolunteerRole(body: any) {
    this.http.post('https://localhost:7004/api/ITripVolunteerrole/CREATEtrip_volunteerRoles', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Trip Volunteer Role has been created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while creating the Trip Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteTripVolunteerRole(id: number) {
    this.http.delete('https://localhost:7004/api/ITripVolunteerrole/Deletetrip_volunteerRoles/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Trip Volunteer Role has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Trip Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteTripVolunteerRoleForATrip(id: number, tripid: number) {
    this.http.delete(`https://localhost:7004/api/TripVolunteerrole/Deletetrip_volunteerRoles?id=${id}&tripid=${tripid}`).subscribe(resp => {
    }, err => {
    })
  }

  updateTripVolunteerRole(body: any) {
    this.http.put('https://localhost:7004/api/ITripVolunteerrole/UPDATEtrip_volunteerRoles', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'update Trip Volunteer Role!',
        text: 'The Trip Volunteer Role has been updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripVolunteerRole();

    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the Trip Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  //All Users Informations
  AllUsers: any = [];
  GetAllUsersData() {
    this.http.get('https://localhost:7004/api/UserLogin/GetAllUserInformation').subscribe(result => {
      this.AllUsers = result;
    }, err => {
    })
  }


  //Trip
  Trip: any = [];
  TripById: any = {};
  GetAllTrips() {
    this.http.get('https://localhost:7004/api/Trips/GetAllTripInformation').subscribe(result => {
      this.Trip = result;
    }, err => {
    })
  }

  GetTripById(id: number) {
    this.http.get('https://localhost:7004/api/Trips/GetTripById/' + id).subscribe(result => {
      this.TripById = result;
    }, err => {
    })
  }
  CreateTrip(body: any) {
    body.image_Name = this.displayImage;
    this.http.post('https://localhost:7004/api/Trips/CreateTrip', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Create Trip!',
        text: 'The Trip has been created successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.GetAllTrips();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while created the trip. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  DeleteTrip(id: number) {
    this.http.delete('https://localhost:7004/api/Trips/DeleteTrip/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Delete Trip!',
        text: 'The Trip has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.GetAllTrips();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleted the trip. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }


  UpdateTrip(body: any) {
    this.http.put('https://localhost:7004/api/Trips/UpdateTrip', body).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Update Trip!',
        text: 'The Trip has been Updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.GetAllTrips();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while Update the trip. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  //Trip Images
  TripImage: any = [];
  displayImage: any;
  GetTripImageByTripId(id: number) {
    this.http.get('https://localhost:7004/api/TripImage/GetTripImageByTripId/' + id).subscribe(result => {
      this.TripImage = result;
    }, err => {
    })
  }

  CreateTripImage(body: any) {
    body.image_Name = this.displayImage;
    this.http.post('https://localhost:7004/api/TripImage/CreateTripImage', body).subscribe((resp) => {
      window.location.reload();
    }, err => {
      window.location.reload();
    })
  }

  DeleteTripImage(id: number) {
    this.http.delete('https://localhost:7004/api/TripImage/DeleteTripImage/' + id).subscribe(resp => {
      window.location.reload();
    }, err => {
    })
  }

  updateTripImage(body: any) {
    body.image_Name = this.displayImage;
    this.http.put('https://localhost:7004/api/TripImage/UpdateTripImage', body).subscribe((resp) => {
      window.location.reload();
    }, err => {
    })
  }

  NumberOfRegisteredUsers(): Observable<number> {
    return this.http.get<number>('https://localhost:7004/api/Users/NumberOfRegisteredUsers');
  }

  uploadTripImage(file: FormData) {
    this.http.post('https://localhost:7004/api/TripImage/uploadImage', file).subscribe((res: any) => {
      this.displayImage = res.image_Name;
    }, err => {
    })
  }

  TripsWithMaxReservations: any = [];
  GetAllTripsWithMaxReservations() {
    this.http.get('https://localhost:7004/api/Trips/TripsWithMaxReservations').subscribe(result => {
      this.TripsWithMaxReservations = result;
      console.log('TripsWithMaxReservations',result);
    }, err => {
    })
  }

  NumberOfTrips(): Observable<number> {
    return this.http.get<number>('https://localhost:7004/api/Trips/trips/GetNumberOfTrips');
  }

  NumberOfFinishedTrips(): Observable<number> {
    return this.http.get<number>('https://localhost:7004/api/Trips/trips/NumberOfFinishedTrips');
  }

  TotalNumberOfVolunteer(): Observable<number> {
    return this.http.get<number>('https://localhost:7004/api/Volunteers/TotalNumberOfVolunteer');
  }

  TotalNumberOfBooking(): Observable<number> {
    return this.http.get<number>('https://localhost:7004/api/Booking/TotalNumberOfBooking');
  }

  //Reports
  //Monthly Report
  MonthlyReport: any = [];
  GetAllMonthlyReport() {
    this.http.get('https://localhost:7004/api/MonthlyReport/MonthlyReport').subscribe(result => {
      this.MonthlyReport = result;
    }, err => {
    })
  }

  //Anuual Report
  AnuualReport: any = [];
  GetAllAnuualReport() {
    this.http.get('https://localhost:7004/api/Annual/AnnualReport').subscribe(result => {
      this.AnuualReport = result;
    }, err => {
    })
  }

  UserInfo: any;
  GetUserByLoginId(id: number) {
    this.http.get('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/' + id).subscribe(result => {
      this.UserInfo = result;
    }, err => {
    })
  }

  //UserInformation
  UserInformation: any;
  GetUserinfoByLoginId(id: number) {
    this.http.get('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/' + id).subscribe(result => {
      this.UserInformation = result;
    }, err => {
    })
  }

  updateUserData(updatedData: any, image_Path: any) {
    let params = new HttpParams()
      .set('L_Email', updatedData.email)
      .set('L_Pass', updatedData.password)
      .set('L_RePass', updatedData.repassword)
      .set('r_id', updatedData.role_Id)
      .set('u_id', updatedData.user_Id)
      .set('F_Name', updatedData.first_Name)
      .set('L_Name', updatedData.last_Name)
      .set('u_Address', updatedData.address)
      .set('phone', updatedData.phone_Number)
      .set('L_id', updatedData.login_Id)
      .set('B_Day', updatedData.birth_Date);

    if (this.display_Image1 != null && this.display_Image1 !== undefined) {
      params = params.set('IMG', this.display_Image1);
    } else if (image_Path) {
      params = params.set('IMG', image_Path);
    }

    this.http.put('https://localhost:7004/api/UserLogin/UpdateAllUserInformation', {}, { params })
      .subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Profile updated successfully',
          });
          this.GetUserinfoByLoginId(updatedData.user_Id);
        },
        error => {
        }
      );
  }

  display_Image1: any;
  uploadUserImage(file: FormData) {
    this.http.post('https://localhost:7004/api/Users/uploadImage', file).subscribe((res: any) => {
      this.display_Image1 = res.image_Path;
    }, err => {
    })
  }

  //UserData
  getUserData(email: string): Observable<any> {
    return this.http.get(`https://localhost:7004/api/UserLogin/GetUserinfoByEmail?email=${email}`);
  }

  getTripDetails(tripId: number): Observable<any> {
    return this.http.get(`https://localhost:7004/api/Trips/GetTripById/${tripId}`);
  }
  private apiUrl = 'https://localhost:7004/api';
  sendTripDetailsEmail(emailData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Volunteers/sendTripDetailsEmail`, emailData, { headers });
  }

  changePassword(payload: any) {
    this.http.put('https://localhost:7004/api/UserLogin/ChangePassword', payload)
      .subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Password Changed Successfully',
            text: 'Your password has been updated.',
            confirmButtonColor: '#f15d30'
          }).then(() => {
            this.GetUserinfoByLoginId(payload.login_Id);
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Password Change Failed',
            text: 'There was an issue updating your password. Please try again.',
            confirmButtonColor: '#f15d30'
          });
        }
      );
  }

  //Testimonial
  Testimonial: any = [];
  getALLTestimonial() {
    this.http.get("https://localhost:7004/api/Testimonial/GetAllTestimonies").subscribe(
      res => {
        this.Testimonial = res;
      },
      err => {
      }
    );
  }

  DeleteTestimonial(id: number) {
    this.http.delete('https://localhost:7004/api/Testimonial/DeleteTestimony/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Testimonial has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getALLTestimonial();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Testimonial. Please try again.',
        confirmButtonText: 'OK'
      });
    })
  }

  updateTestimonial(body: any) {
    this.http.put('https://localhost:7004/api/Testimonial/UpdateTestimony', body).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Update Successful',
          text: 'The testimonial has been updated successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
        this.getALLTestimonial();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update the testimonial. Please try again later.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Retry'
        });
      }
    );
  }

  GetVolunteerUserInfoByTripId: any = {};
  GetVolunteerUserInfoByTripId1(trip_Id: number) {
    this.http.get('https://localhost:7004/api/Trips/GetVolunteerUserInfoByTripId/' + trip_Id).subscribe(result => {
      this.GetVolunteerUserInfoByTripId = result;
    }, err => {
    })
  }

  GetUserPaymentsForTrip: any = {};
  GetUserPaymentsForTrip1(trip_Id: number) {
    this.http.get('https://localhost:7004/api/Trips/GetUserPaymentsForTrip/' + trip_Id).subscribe(result => {
      this.GetUserPaymentsForTrip = result;
    }, err => {
    })
  }

  //services for trips in admin
  tripServices: any = [];
  GetServicesByTripID(trip_Id: number) {
    this.http.get(`https://localhost:7004/api/serviceTripe/GetServiceByTripID/${trip_Id}`).subscribe(result => {
      this.tripServices = result;
    }, err => {
    })
  }

  //create a service(admin)
  async CreateService(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/Service/CreateService', body).toPromise();
    } catch (error) {
    }
  }

  async CreateServiceForTrip(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/Service/CreateServiceForTrip', body).toPromise();
    } catch (error) {
    }
  }

  async CreateTripServiceForServicesList(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/serviceTripe/CreateTripServiceForServicesList', body).toPromise();
    } catch (error) {
    }
  }

  FiveUsers: any = [];
  GetFiveUsersData() {
    this.http.get('https://localhost:7004/api/UserLogin/GetAllUserInformation').subscribe(result => {
      if (Array.isArray(result)) {
        this.FiveUsers = result.slice(0, 5);
      } else {
      }
    }, err => {
    });
  }

  AllContactU: any = [];
  GetAllContactU() {
    this.http.get('https://localhost:7004/api/ContactU').subscribe(result => {
      this.AllContactU = result;
    }, err => {
    })
  }

  FiveContactU: any = [];
  GetFiveContactU() {
    this.http.get('https://localhost:7004/api/ContactU').subscribe(result => {
      if (Array.isArray(result)) {
        this.FiveContactU = result.slice(0, 3);
      }
    }, err => {
    })
  }

  SYSMonthlyRevenue: any = [];
  GetSYSMonthlyRevenue() {
    this.http.get('https://localhost:7004/api/MonthlyReport/GetSYSMonthlyRevenue').subscribe(result => {
      this.SYSMonthlyRevenue = result;
    }, err => {

    })
  }

  monthlyReport: any;
  async getMonthlyReport(month: string, year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/MonthlyReport/MonthlyReport/${year}/${month}`).toPromise();
      this.monthlyReport = res;
    } catch (error) {
    }
  }
  years: any = [];
  mappedYears: any = []
  async GetDistinctTripYears(): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/MonthlyReport/GetDistinctTripYears').toPromise();
      this.years = res;
      this.mappedYears = this.years.map((item: any) => item.trip_Year);
    } catch (error) {
    }
  }

  dayReport: any;
  async GetDailyRevenueForMonth(month: string, year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/MonthlyReport/GetDailyRevenueForMonth/${year}/${month}`).toPromise();
      this.dayReport = res;
    } catch (error) {
    }
  }
  monthReport: any;
  async GetMonthlyRevenueForYear(year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/Annual/GetMonthlyRevenueForYear/${year}`).toPromise();
      this.monthReport = res;
    } catch (error) {
    }
  }
  annualReport: any;
  async GetYearlyRevenue(year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/Annual/GetYearlyRevenue/${year}`).toPromise();
      this.annualReport = res;
    } catch (error) {
    }
  }

  testemonyCounts: any = {}
  async GetTestimonyStatusCounts(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/Testimonial/GetTestimonyStatusCounts`).toPromise();
      this.testemonyCounts = res;
    } catch (error) {
    }
  }

  totalUsersPerCategory: any = {}
  async GetTotalUsersPerCategory(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/categories/GetTotalUsersPerCategory`).toPromise();
      this.totalUsersPerCategory = res;
    } catch (error) {
    }
  }

  averageRatingPerCategory: any = {}
  async GetAverageRatingPerCategory(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/categories/GetAverageRatingPerCategory`).toPromise();
      this.averageRatingPerCategory = res;
    } catch (error) {
    }
  }

  netRevenuePerCategory: any = {}
  async GetNetRevenuePerCategory(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/categories/GetNetRevenuePerCategory`).toPromise();
      this.netRevenuePerCategory = res;
    } catch (error) {
    }
  }

  PaidBookingPercentage: any = 0
  async CalculatePaidBookingPercentage(): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/UserLogin/CalculatePaidBookingPercentage`).toPromise();
      this.PaidBookingPercentage = res;
    } catch (error) {
    }
  }

  display_Image: any;
  uploadAttachment(file: FormData) {
    this.http.post('https://localhost:7004/api/categories/uploadImage', file).subscribe((resp: any) => {
      this.display_Image = resp.imagename;
    }, err => {
    })
  }
}