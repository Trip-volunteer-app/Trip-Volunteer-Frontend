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
      console.log(err.message);
    })
  }


  CreateCategories(body: any) {
    this.http.post('https://localhost:7004/api/categories/CREATEcategories', body).subscribe((resp) => {
      console.log('the Categories created');
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
      console.log('Error');
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
      console.log('the Categories deleted');
      this.getAllCategories();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the categories. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
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
      console.log('Updated');
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updateing the categories. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('error');
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
      console.log('sortedServices', this.sortedServices)
    } catch (error) {
      console.error('Error fetching selected element:', error);
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
      console.log('the Services created');
      this.getAllServices();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while creating the categories. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
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
      console.log('the Services deleted');
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Services. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
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
      console.log('bodybodybodybodybodybodybody')
      console.log('Updated');
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updated the Services. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('error');
    })
  }


  // VolunteerRole
  VolunteerRole: any = [];
  getAllVolunteerRole() {
    this.http.get('https://localhost:7004/api/VolunteerRoles/GetAllVolunteerRoles').subscribe(result => {
      this.VolunteerRole = result;
    }, err => {
      console.log(err.message);
    })
  }

  VolunteerRoles: any = [];
  SortedVolunteerRoles = [];
  async getAllVolunteerRoles(): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/VolunteerRoles/GetAllVolunteerRoles').toPromise();
      this.VolunteerRoles = res;
      this.SortedVolunteerRoles = this.VolunteerRoles.sort((a: any, b: any) => (b.volunteer_Role_Id - a.volunteer_Role_Id));
      console.log('sortedServicessortedServices', this.SortedVolunteerRoles)
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }

  async CreateVolunteerRoles(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/VolunteerRoles/CreateVolunteerRole', body).toPromise();
      console.log('the Volunteer Role created');
    } catch (error) {
      console.error('Error creating', error);
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
      console.log('the Volunteer Role created');
      this.getAllVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
    })
  }

  DeleteVolunteerRole(id: number) {
    this.http.delete('https://localhost:7004/api/VolunteerRoles/DeleteVolunteerRole/' + id).subscribe(resp => {
      console.log('the Volunteer Role deleted');
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Volunteer Role has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllVolunteerRole();
    }, err => {
      console.log('Error');
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
      console.log('the Volunteer Role Updated');
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
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
      console.log('error');
    })
  }


  tripVolunteers: any = [];
  async GetVolunteerRoleByTripID(trip_Id: number): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/VolunteerRoles/GetRoleByTripID/${trip_Id}`).toPromise();
      this.tripVolunteers = res;
      console.log('this.tripVolunteersthis.tripVolunteers', this.tripVolunteers)
    } catch (error) {
      console.error('Error creating', error);
    }
  }

  async CreateTripVRoleForVRolesList(body: any): Promise<void> {
    try {
      console.log('Final Body:', body);
      await this.http.post('https://localhost:7004/api/TripVolunteerrole/CreateTripVRoleForVRolesList', body).toPromise();
      console.log('the trip services Added');
    } catch (error) {
      console.error('Error creating', error);
    }
  }
  UpdateTrip_vrole_NumberOfVolunteers(body: any) {
    this.http.put('https://localhost:7004/api/TripVolunteerrole/UpdateTrip_vrole_NumberOfVolunteers', body).subscribe((resp) => {
      console.log('Updated');
    }, err => {
      console.log('error');
    })
  }


  async CreateVolunteerRoleForTrip(body: any): Promise<void> {
    try {
      console.log('Final Body:', body);
      await this.http.post('https://localhost:7004/api/VolunteerRoles/CreateVolunteerRoleForTrip', body).toPromise();
      console.log('the service Added');
    } catch (error) {
      console.error('Error creating', error);
    }
  }


  // Volunteer
  Volunteer: any = [];
  getAllVolunteer() {
    this.http.get('https://localhost:7004/api/Volunteers/GetAllVolunteers').subscribe(result => {
      this.Volunteer = result;
    }, err => {
      console.log(err.message);
    })
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
      console.log('the Volunteer deleted');
      this.getAllVolunteer();
    }, err => {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Volunteer. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
    })
  }


  updateVolunteer(volunteer: any): Observable<any> {
    return this.http.put('https://localhost:7004/api/Volunteers/UpdateVolunteer', volunteer);  // Ensure this returns an observable
  }

  // Return an observable for sending email
  sendEmail(emailData: any): Observable<any> {
    return this.http.post('https://localhost:7004/api/Volunteers/send-email', emailData);  // Ensure this returns an observable
  }






  // Trip Services
  TripServices: any = [];
  getAllTripServices() {
    this.http.get('https://localhost:7004/api/serviceTripe/GetAllTripServices').subscribe(result => {
      this.TripServices = result;
    }, err => {
      console.log(err.message);
    })
  }


  CreateTripServices(body: any) {
    this.http.post('https://localhost:7004/api/serviceTripe/CreateTripService', body).subscribe((resp) => {
      console.log('the Trip Services created');
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
      console.log('Error');
    })
  }


  DeleteTripServices(id: number) {
    console.log('open admin');
    this.http.delete('https://localhost:7004/api/serviceTripe/DeleteTripService/' + id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Create Trip Services!',
        text: 'The Trip Services has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripServices();
      console.log('the Trip Services deleted');
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleted the Trip Services. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
    })
  }


  updateTripServices(body: any) {
    this.http.put('https://localhost:7004/api/serviceTripe/UpdateTripService', body).subscribe((resp) => {
      console.log('the Trip Services Updated');
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
      console.log('error');
    })
  }



  // Review
  Review: any = [];
  getAllReview() {
    this.http.get('https://localhost:7004/api/Review').subscribe(result => {
      this.Review = result;
    }, err => {
      console.log(err.message);
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
      console.log('the Review deleted');
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the Review. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
    })
  }




  // Trip Volunteer Role
  TripVolunteerRole: any = [];
  getAllTripVolunteerRole() {
    this.http.get('https://localhost:7004/api/TripVolunteerrole/GetAlltrip_volunteerRoles').subscribe(result => {
      this.TripVolunteerRole = result;
    }, err => {
      console.log(err.message);
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
      console.log('the Trip Volunteer Role created');
      this.getAllTripVolunteerRole();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while creating the Trip Volunteer Role. Please try again.',
        confirmButtonText: 'OK'
      });
      console.log('Error');
    })
  }


  DeleteTripVolunteerRole(id: number) {
    this.http.delete('https://localhost:7004/api/ITripVolunteerrole/Deletetrip_volunteerRoles/' + id).subscribe(resp => {
      console.log('the Trip Volunteer Role deleted');
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The Trip Volunteer Role has been deleted successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      this.getAllTripVolunteerRole();
    }, err => {
      console.log('Error');
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
      console.log('the Trip Volunteer Role deleted');
    }, err => {
      console.log('Error');
    })
  }

  updateTripVolunteerRole(body: any) {
    this.http.put('https://localhost:7004/api/ITripVolunteerrole/UPDATEtrip_volunteerRoles', body).subscribe((resp) => {
      console.log('the Trip Volunteer Role Updated');
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
      console.log('error');
    })
  }



  //All Users Informations
  AllUsers: any = [];
  GetAllUsersData() {
    this.http.get('https://localhost:7004/api/UserLogin/GetAllUserInformation').subscribe(result => {
      this.AllUsers = result;
    }, err => {
      console.log(err.message);
    })
  }


  //Trip
  Trip: any = [];
  TripById: any = {};
  GetAllTrips() {
    this.http.get('https://localhost:7004/api/Trips/GetAllTripInformation').subscribe(result => {
      this.Trip = result;
    }, err => {
      console.log(err.message);
    })
  }

  GetTripById(id: number) {
    this.http.get('https://localhost:7004/api/Trips/GetTripById/' + id).subscribe(result => {
      this.TripById = result;
    }, err => {
      console.log(err.message);
    })
  }
  CreateTrip(body: any) {
    body.image_Name = this.displayImage;
    console.log('createtrip_body', body)
    this.http.post('https://localhost:7004/api/Trips/CreateTrip', body).subscribe((resp) => {
      console.log('the Trip Added');
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
      console.log('Error');
    })
  }


  DeleteTrip(id: number) {
    this.http.delete('https://localhost:7004/api/Trips/DeleteTrip/' + id).subscribe(resp => {
      console.log('the Trip deleted');

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
      console.log('Error');
    })
  }


  UpdateTrip(body: any) {
    this.http.put('https://localhost:7004/api/Trips/UpdateTrip', body).subscribe((resp) => {
      console.log('Updated');
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
      console.log('error');
    })
  }



  //Trip Images
  TripImage: any = [];
  displayImage: any;
  GetTripImageByTripId(id: number) {
    this.http.get('https://localhost:7004/api/TripImage/GetTripImageByTripId/' + id).subscribe(result => {
      this.TripImage = result;
    }, err => {
      console.log(err.message);
    })
  }

  CreateTripImage(body: any) {
    body.image_Name = this.displayImage;
    this.http.post('https://localhost:7004/api/TripImage/CreateTripImage', body).subscribe((resp) => {
      console.log('the Trip Image Added');
      window.location.reload();
    }, err => {
      console.log('Error');
      window.location.reload();
    })
  }


  DeleteTripImage(id: number) {
    this.http.delete('https://localhost:7004/api/TripImage/DeleteTripImage/' + id).subscribe(resp => {
      console.log('the Trip Image deleted');
      window.location.reload();
    }, err => {
      console.log('Error', err.message);
    })
  }


  updateTripImage(body: any) {
    body.image_Name = this.displayImage;
    this.http.put('https://localhost:7004/api/TripImage/UpdateTripImage', body).subscribe((resp) => {
      console.log('Updated');
      window.location.reload();
    }, err => {
      console.log('error');
    })
  }


  NumberOfRegisteredUsers(): Observable<number> {
    return this.http.get<number>('https://localhost:7004/api/Users/NumberOfRegisteredUsers');
  }

  uploadTripImage(file: FormData) {
    this.http.post('https://localhost:7004/api/TripImage/uploadImage', file).subscribe((res: any) => {
      this.displayImage = res.image_Name;
    }, err => {
      console.log('error');
    })


  }



  TripsWithMaxReservations: any = [];
  GetAllTripsWithMaxReservations() {
    this.http.get('https://localhost:7004/api/Trips/TripsWithMaxReservations').subscribe(result => {
      this.TripsWithMaxReservations = result;
      console.log('GetAllTripsWithMaxReservations', result);

    }, err => {
      console.log(err.message);
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
      console.log(this.MonthlyReport);
    }, err => {
      console.log(err.message);
    })
  }



  //Anuual Report
  AnuualReport: any = [];
  GetAllAnuualReport() {
    this.http.get('https://localhost:7004/api/Annual/AnnualReport').subscribe(result => {
      this.AnuualReport = result;
    }, err => {
      console.log(err.message);
    })
  }



  UserInfo: any;
  GetUserByLoginId(id: number) {
    this.http.get('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/' + id).subscribe(result => {
      this.UserInfo = result;
      console.log("UserInformation", this.UserInfo);

    }, err => {
      console.log(err.message);
    })
  }
  //UserInformation
  UserInformation: any;
  GetUserinfoByLoginId(id: number) {
    this.http.get('https://localhost:7004/api/UserLogin/GetUserinfoByLoginId/' + id).subscribe(result => {
      this.UserInformation = result;
      console.log("UserInformation", this.UserInformation);

    }, err => {
      console.log(err.message);
    })
  }





  updateUserData(updatedData: any, image_Path: any) {
    // Prepare the parameters for the API call
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
          console.error("Error updating user data", error.message);
        }
      );
  }

  display_Image1: any;

  uploadUserImage(file: FormData) {
    this.http.post('https://localhost:7004/api/Users/uploadImage', file).subscribe((res: any) => {
      this.display_Image1 = res.image_Path;
      console.log("imageprofile", res);

    }, err => {
      console.log('error');
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
          console.log("Change Password successfully", result);

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
          console.error("Error Changing Password", error.message);

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
        console.log(this.Testimonial);
      },
      err => {
        console.log(err.message);
      }
    );
  }


  DeleteTestimonial(id: number) {
    this.http.delete('https://localhost:7004/api/Testimonial/DeleteTestimony/' + id).subscribe(resp => {
      console.log('the Testimonial deleted');
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
      console.log('Error', err.message);
    })
  }




  updateTestimonial(body: any) {
    this.http.put('https://localhost:7004/api/Testimonial/UpdateTestimony', body).subscribe(
      (resp) => {
        console.log('The testimonial was updated');
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
        console.log(err);
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
      console.log(result);
    }, err => {
      console.log('errrrrrrrrrrrrror', err.message);
    })
  }


  GetUserPaymentsForTrip: any = {};
  GetUserPaymentsForTrip1(trip_Id: number) {
    this.http.get('https://localhost:7004/api/Trips/GetUserPaymentsForTrip/' + trip_Id).subscribe(result => {
      this.GetUserPaymentsForTrip = result;
      console.log(result);
    }, err => {
      console.log('errrrrrrrrrrrrror', err.message);
    })
  }

  //services for trips in admin
  tripServices: any = [];
  GetServicesByTripID(trip_Id: number) {
    this.http.get(`https://localhost:7004/api/serviceTripe/GetServiceByTripID/${trip_Id}`).subscribe(result => {
      this.tripServices = result;
      console.log(this.tripServices);
    }, err => {
      console.log(err.message);
    })
  }

  //create a service(admin)
  async CreateService(body: any): Promise<void> {
    try {
      await this.http.post('https://localhost:7004/api/Service/CreateService', body).toPromise();
      console.log('Created successfully');
    } catch (error) {
      console.error('Error creating', error);
    }
  }

  async CreateServiceForTrip(body: any): Promise<void> {
    try {
      console.log('Final Body:', body);
      await this.http.post('https://localhost:7004/api/Service/CreateServiceForTrip', body).toPromise();
      console.log('the service Added');
    } catch (error) {
      console.error('Error creating', error);
    }
  }
  async CreateTripServiceForServicesList(body: any): Promise<void> {
    try {
      console.log('Final Body:', body);
      await this.http.post('https://localhost:7004/api/serviceTripe/CreateTripServiceForServicesList', body).toPromise();
      console.log('the trip services Added');
    } catch (error) {
      console.error('Error creating', error);
    }
  }
  monthlyReport: any;
  async getMonthlyReport(month: string, year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/MonthlyReport/MonthlyReport/${year}/${month}`).toPromise();
      this.monthlyReport = res;
      console.log('monthlyReport', this.monthlyReport)
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
  // }{year} +{month}
  years: any = [];
  mappedYears: any = []
  async GetDistinctTripYears(): Promise<void> {
    try {
      const res = await this.http.get('https://localhost:7004/api/MonthlyReport/GetDistinctTripYears').toPromise();
      this.years = res;
      this.mappedYears = this.years.map((item: any) => item.trip_Year);
      console.log('Years:', this.years);
      console.log('years', this.mappedYears)
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
  dayReport: any;
  async GetDailyRevenueForMonth(month: string, year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/MonthlyReport/GetDailyRevenueForMonth/${year}/${month}`).toPromise();
      this.dayReport = res;
      console.log('dayReport', this.dayReport)
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
  monthReport: any;
  async GetMonthlyRevenueForYear(year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/Annual/GetMonthlyRevenueForYear/${year}`).toPromise();
      this.monthReport = res;
      console.log('monthReport', this.monthReport)
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
  annualReport: any;
  async GetYearlyRevenue(year: string): Promise<void> {
    try {
      const res = await this.http.get(`https://localhost:7004/api/Annual/GetYearlyRevenue/${year}`).toPromise();
      this.annualReport = res;
      console.log('annualReport', this.annualReport)
    } catch (error) {
      console.error('Error fetching selected element:', error);
    }
  }
}