import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {



  constructor(public admin: AdminService) { }

  ngOnInit(): void {
    this.admin.GetAllMonthlyReport();
  }


}







