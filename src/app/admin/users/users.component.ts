import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public admin:AdminService,public dialog: MatDialog)
  {}


  ngOnInit(): void {
    this.admin.GetAllUsersData();
  }


}



