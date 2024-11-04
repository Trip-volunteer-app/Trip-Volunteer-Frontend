import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  }

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
    login_Id: new FormControl('', Validators.required),
    trip_Id: new FormControl('', Validators.required),
    volunteer_Role_Id: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    phone_Number: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    emergency_Contact: new FormControl('', Validators.required),
    date_Applied: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  pData: any = {};
  statusList: string[] = ['Pending', 'Accepted', 'Rejected'];

  openEditDailog(obj: any) {
    this.pData = obj;
    this.Volunteer.controls['volunteer_Id'].setValue(this.pData.volunteer_Id);
    this.dialog.open(this.EditDailog);
  }

  save2() {
    const updatedVolunteer = this.Volunteer.value;

    this.admin.updateVolunteer(updatedVolunteer).subscribe(response => {
      const status = updatedVolunteer.status;

      if (status === 'Accepted' || status === 'Rejected') {
        this.sendEmailNotification(updatedVolunteer.volunteer_Id, status);

        if (status === 'Accepted') {
          this.sendTripDetails(updatedVolunteer.trip_Id);
        }
      }
    });
  }

  sendEmailNotification(volunteerId: number, status: string) {
    const userEmail = this.pData.email;

    const emailData = {
      email: userEmail,
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
        tripDetails: `Trip Name: ${tripDetails.trip_Name}, Start Date: ${tripDetails.start_Date},End Date: ${tripDetails.end_Date},Description: ${tripDetails.description}, Location: ${tripDetails.trip_Location_Id}`
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
  

  disableField(event: Event) {
    const inputField = event.target as HTMLInputElement;
    inputField.disabled = true;
  }
}
