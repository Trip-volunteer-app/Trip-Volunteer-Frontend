import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
@Component({
  selector: 'app-anuual-report',
  templateUrl: './anuual-report.component.html',
  styleUrls: ['./anuual-report.component.css']
})
export class AnuualReportComponent implements OnInit{

  constructor (public admin:AdminService){}

  ngOnInit(): void {
    this.admin.GetAllAnuualReport();
  }



}
