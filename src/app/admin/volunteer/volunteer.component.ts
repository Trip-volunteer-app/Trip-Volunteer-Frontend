import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
  @ViewChild('callEditDailog') EditDailog !: TemplateRef<any>;

  constructor(public admin: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin.getAllVolunteer();    
    
    this.Volunteer.controls['experience'].disable();
    this.Volunteer.controls['phone_Number'].disable();
    this.Volunteer.controls['notes'].disable();
    this.Volunteer.controls['emergency_Contact'].disable();
    this.Volunteer.controls['date_Applied'].disable();
    this.Volunteer.controls['email'].disable();


  }

  first_Name: string = '';
  last_Name: string = '';
  trip_Name: string = '';
  role_Name: string = '';

  openDeleteDialog(id: number) {
    this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.admin.DeleteVolunteer(id);
      } else if (result === 'no') {
        console.log('Operation cancelled');
      }
    });
  }

  Volunteer: FormGroup = new FormGroup({
    volunteer_Id: new FormControl(),
    login_Id: new FormControl('', Validators.required ),
    trip_Id: new FormControl('', Validators.required),
    volunteer_Role_Id: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    phone_Number: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    emergency_Contact: new FormControl('', Validators.required),
    date_Applied: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  
  pData: any = {};
  statusList: string[] = ['Accepted', 'Rejected'];

  openEditDailog(obj: any) {
    this.pData = obj;
    console.log("PData",this.pData);
    
    this.Volunteer.controls['volunteer_Id'].setValue(this.pData.volunteer_Id);
    this.Volunteer.controls['login_Id'].setValue(this.pData.login_Id);
    this.Volunteer.controls['trip_Id'].setValue(this.pData.trip_Id);
    this.Volunteer.controls['volunteer_Role_Id'].setValue(this.pData.volunteer_Role_Id);
    this.Volunteer.controls['experience'].setValue(this.pData.experience);
    this.Volunteer.controls['emergency_Contact'].setValue(this.pData.emergency_Contact);
    this.Volunteer.controls['phone_Number'].setValue(this.pData.phone_Number);
    this.Volunteer.controls['notes'].setValue(this.pData.notes);
    this.Volunteer.controls['date_Applied'].setValue(this.pData.date_Applied);
    this.Volunteer.controls['email'].setValue(this.pData.email);

    this.dialog.open(this.EditDailog);
  }

  save2(numberVolunteer: number) {
    const updatedVolunteer = this.Volunteer.value;
  
    // Check if the volunteer's status is "Accepted"
    if (updatedVolunteer.status === 'Accepted') {
      if (numberVolunteer > 0) {
        this.admin.UpdateVolunteerStatus(updatedVolunteer).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Status Updated',
              text: 'The volunteer status has been successfully updated.',
              confirmButtonText: 'OK'
            });
  
            // If the volunteer status is "Accepted"
            this.handleAcceptedStatus(updatedVolunteer);
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'There was an error updating the volunteer status. Please try again.',
              confirmButtonText: 'OK'
            });
            console.log('Error:', err.message); // Log error message in English
          }
        );
      } else {
        // If numberVolunteer is 0, update all volunteers with the same trip_Id to "Rejected"
        Swal.fire({
          icon: 'warning',
          title: 'Max Volunteers Reached',
          text: 'The maximum number of volunteers has been reached. Would you like to reject additional volunteers?',
          showCancelButton: true,
          confirmButtonText: 'Yes, Reject Others',
          cancelButtonText: 'No, Keep as is'
        }).then((result) => {
          if (result.isConfirmed) {
            // If admin clicks "Yes", reject all volunteers with the same trip_Id
            this.rejectAllVolunteers(updatedVolunteer.trip_Id);
            this.admin.getAllVolunteer();    

            Swal.fire({
              icon: 'info',
              title: 'Volunteers Rejected',
              text: 'All additional volunteers for this trip have been rejected.',
              confirmButtonText: 'OK'
            });
            this.admin.getAllVolunteer();    

          } this.admin.getAllVolunteer();
        });
      }
    } else {
      this.admin.UpdateVolunteerStatus(updatedVolunteer).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Status Updated',
            text: 'The volunteer status has been successfully updated.',
            confirmButtonText: 'OK'
          });

          if (updatedVolunteer.status === 'Rejected') {
            this.sendEmailNotification(updatedVolunteer.volunteer_Id,updatedVolunteer.email, updatedVolunteer.status);
          }    
          this.admin.getAllVolunteer();    
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was an error updating the volunteer status. Please try again.',
            confirmButtonText: 'OK'
          });
          console.log('Error:', err.message); // Log error message in English
          this.admin.getAllVolunteer();    

        }          

      );    
    }
  
  }
  
  handleAcceptedStatus(updatedVolunteer: any) {
    this.sendEmailNotification(updatedVolunteer.volunteer_Id,updatedVolunteer.email, 'Accepted');
    this.sendTripDetails(updatedVolunteer.trip_Id);
    this.admin.updateNumberOfVolunteer(updatedVolunteer);
    this.admin.getAllVolunteer();    

  }
  
  rejectAllVolunteers(tripId: number) {
    // Use getAllVolunteers to fetch all volunteers
    this.admin.getAllVolunteers().subscribe(
      volunteers => {
        // Filter volunteers by trip_Id and status 'Pending'
        const volunteersToReject = volunteers.filter(
          volunteer => volunteer.trip_Id === tripId && volunteer.status.toLowerCase() === 'pending'
        );
  
        // Check if there are any volunteers to reject
        if (volunteersToReject.length > 0) {
          // Update the status of all filtered volunteers to "Rejected"
          volunteersToReject.forEach(volunteer => {
            this.admin.UpdateVolunteerStatus({ ...volunteer, status: 'Rejected' }).subscribe(
              response => {
                console.log(`The status of volunteer ${volunteer.volunteer_Id} has been updated to Rejected.`);
                this.sendEmailNotification(volunteer.volunteer_Id,volunteer.email, 'Rejected');
  
                // Refresh volunteer list after update
                this.admin.getAllVolunteer();
              },
              err => {
                console.log(`Error updating status of volunteer ${volunteer.volunteer_Id}: ${err.message}`);
              }
            );
          });
        } else {
          console.log(`No pending volunteers found for trip ID ${tripId}.`);
          this.admin.getAllVolunteer();
        }
      },
      err => {
        console.log('Error fetching volunteers:', err.message);
      }
    );
  }
  
  
  

  sendEmailNotification(volunteerId: number, email: string, status: string) {

    const emailData = {
      email: email,
      status: status
    };

    this.admin.sendEmail(emailData).subscribe(response => {
      console.log("Status email sent successfully", response);
    }, error => {
      console.error("Error sending status email", error);
    });
  }

  sendTripDetails(tripId: number) {
    this.admin.getTripDetails(tripId).subscribe(tripDetails => {
      console.log("Trip details received:", tripDetails); // Log to inspect the data structure
  
      const userEmail = this.pData.email;
  
      // const emailData = {
      //   email: userEmail,
      //   tripDetails: tripDetails?.details || JSON.stringify(tripDetails) // Send as a string if details is missing
      // };
  
      const emailData = {
        email: userEmail,
        tripDetails: `Trip Name: ${tripDetails.trip_Name}, Start Date: ${tripDetails.start_Date},End Date: ${tripDetails.end_Date},Description: ${tripDetails.description}, Location: ${tripDetails.destination_Location}`
      };

      
      this.admin.sendTripDetailsEmail(emailData).subscribe(response => {
        console.log("Trip details email sent successfully", response);
      }, error => {
        console.error("Error sending trip details email", error);
      });
    }, error => {
      console.error("Error fetching trip details", error);
    });
  }
  

  // disableField(event: Event) {
  //   const inputField = event.target as HTMLInputElement;
  //   inputField.disabled = true;
  // }
}
