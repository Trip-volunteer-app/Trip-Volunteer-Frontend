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
      } 
    });
  }

  Volunteer: FormGroup = new FormGroup({
    volunteer_Id: new FormControl(),
    login_Id: new FormControl('', Validators.required),
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

            this.handleAcceptedStatus(updatedVolunteer);
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'There was an error updating the volunteer status. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Max Volunteers Reached',
          text: 'The maximum number of volunteers has been reached. Would you like to reject additional volunteers?',
          showCancelButton: true,
          confirmButtonText: 'Yes, Reject Others',
          cancelButtonText: 'No, Keep as is'
        }).then((result) => {
          if (result.isConfirmed) {
            this.rejectAllVolunteers(updatedVolunteer.trip_Id, updatedVolunteer.volunteer_Role_Id);
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
            this.sendEmailNotification(updatedVolunteer.volunteer_Id, updatedVolunteer.email, updatedVolunteer.status);
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
          this.admin.getAllVolunteer();    

        }          

      );    
    }
  }

  handleAcceptedStatus(updatedVolunteer: any) {
    this.sendEmailNotification(updatedVolunteer.volunteer_Id, updatedVolunteer.email, 'Accepted');
    this.sendTripDetails(updatedVolunteer.trip_Id);
    this.admin.updateNumberOfVolunteer(updatedVolunteer);
    this.admin.getAllVolunteer();

  }

  rejectAllVolunteers(tripId: number, volunteerRoleId: number) {
    this.admin.getAllVolunteers().subscribe(
      volunteers => {
        const volunteersToReject = volunteers.filter(

          volunteer => volunteer.trip_Id === tripId && volunteer.volunteer_Role_Id === volunteerRoleId && volunteer.status.toLowerCase() === 'pending'
        );

        if (volunteersToReject.length > 0) {
          volunteersToReject.forEach(volunteer => {
            this.admin.UpdateVolunteerStatus({ ...volunteer, status: 'Rejected' }).subscribe(
              response => {
                this.sendEmailNotification(volunteer.volunteer_Id, volunteer.email, 'Rejected');
                this.admin.getAllVolunteer();
              },
              err => {
              }
            );
          });
        } else {
          this.admin.getAllVolunteer();
        }
      },
      err => {
      }
    );
  }

  sendEmailNotification(volunteerId: number, email: string, status: string) {

    const emailData = {
      email: email,
      status: status
    };

    this.admin.sendEmail(emailData).subscribe(response => {
    }, error => {
    });
  }

  sendTripDetails(tripId: number) {
    this.admin.getTripDetails(tripId).subscribe(tripDetails => {

      const userEmail = this.pData.email;
      const emailData = {
        email: userEmail,
        tripDetails: `Trip Name: ${tripDetails.trip_Name}, Start Date: ${tripDetails.start_Date},End Date: ${tripDetails.end_Date},Description: ${tripDetails.description}, Location: ${tripDetails.destination_Location}`
      };
      this.admin.sendTripDetailsEmail(emailData).subscribe(response => {
      }, error => {
      });
    }, error => {
    });
  }
}