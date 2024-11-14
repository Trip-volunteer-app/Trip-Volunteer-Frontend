import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us-messages',
  templateUrl: './contact-us-messages.component.html',
  styleUrls: ['./contact-us-messages.component.css']
})
export class ContactUsMessagesComponent implements OnInit {

  constructor(public admin: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin.GetAllContactU();
  }
}