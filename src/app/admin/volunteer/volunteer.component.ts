import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit{
  @ViewChild('callDeleteDailog') DeleteDailog !:TemplateRef<any>;  
  @ViewChild('callEditDailog') EditDailog !:TemplateRef<any>;  


  constructor(public admin:AdminService,public dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.admin.getAllVolunteer();
  }



  openDeleteDialog(id:number){
    //open ng-template (callDeleteDailog) 
  const dialogRef=  this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result)=>{
    if(result!=undefined){
      if(result=='yes')
        this.admin.DeleteVolunteer(id);
      else if(result=='no')
        console.log('Thank you ');
        
    }
  })

  }



  Volunteer:FormGroup = new FormGroup({
    volunteer_Id:new FormControl(),
    login_Id:new FormControl('',Validators.required),
    trip_Id:new FormControl('',Validators.required),
    volunteer_Role_Id:new FormControl('',Validators.required),
    experience:new FormControl('',Validators.required),
    phone_Number:new FormControl('',Validators.required),
    notes:new FormControl('',Validators.required),
    emergency_Contact:new FormControl('',Validators.required),
    date_Applied:new FormControl('',Validators.required),
    status:new FormControl('',Validators.required)
  })



  pData:any={}; 

  statusList: string[] = ['Pending', 'Accepted', 'Rejected'];

  openEditDailog(obj:any){
    this.pData=obj; 
    console.log(this.pData);
    this.Volunteer.controls['volunteer_Id'].setValue(this.pData.volunteer_Id)
    this.dialog.open(this.EditDailog)
  }

  save2() {
    const updatedVolunteer = this.Volunteer.value;
  
    // Update volunteer and check status
    this.admin.updateVolunteer(updatedVolunteer).subscribe(response => {
      const status = updatedVolunteer.status;
      
      // Check if status is 'Accepted' or 'Rejected'
      if (status === 'Accepted' || status === 'Rejected') {
        // Send email notification
        this.sendEmailNotification(updatedVolunteer.volunteer_Id, status);
      }
    });
  }
  
  sendEmailNotification(volunteerId: number, status: string) {
    const userEmail = this.pData.email; // Assuming pData contains user's email
  
    const emailData = {
      email: userEmail,
      status: status
    };
  
    // Call sendEmail method and subscribe to the result
    this.admin.sendEmail(emailData).subscribe(response => {
      console.log("Email sent successfully", response);
    }, error => {
      console.log("Error sending email", error);
    });
  }
  
  
  

  // sendEmailNotification(volunteerId: number, status: string) {
  //   // Assuming you fetch the user's email from your form or data
  //   const userEmail = this.pData.email; // Assuming pData contains the user's email
    
  //   const emailData = {
  //     email: userEmail,
  //     status: status
  //   };
  
  //   // Call the .NET API to send the email
  //   this.admin.sendEmail(emailData).subscribe(response => {
  //     console.log("Email sent successfully", response);
  //   }, error => {
  //     console.log("Error sending email", error);
  //   });
  // }
  
  


  disableField(event: Event) {
    const inputField = event.target as HTMLInputElement;
    inputField.disabled = true;
  }
  
}

