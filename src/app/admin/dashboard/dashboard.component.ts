import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: any;


  NumberOfRegisteredUsers: number = 0;
  NumberOfTrips: number = 0;
  NumberOfFinishedTrips: number = 0;
  TotalNumberOfVolunteer = 0;
  TotalNumberOfBooking = 0;

  constructor(public admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.admin.GetFiveUsersData();
    this.admin.GetFiveContactU();
    this.admin.GetSYSMonthlyRevenue();
    this.fetchDataAndRenderChart();


    this.admin.NumberOfRegisteredUsers().subscribe(
      (resp: number) => {
        this.NumberOfRegisteredUsers = resp;
        console.log('NumberOfRegisteredUsers', resp);

      },
      err => {
        console.error('Error fetching the number of registered users:', err);
      }

    );




    this.admin.NumberOfTrips().subscribe(
      (resp: number) => {
        this.NumberOfTrips = resp;
        console.log('NumberOfTrips', resp);

      },
      err => {
        console.error('Error fetching the number of Trips:', err);
      }
    );





    console.log(this.admin.GetAllTripsWithMaxReservations());




    this.admin.TotalNumberOfVolunteer().subscribe(
      (resp: number) => {
        this.TotalNumberOfVolunteer = resp;
      },
      err => {
        console.error('Error fetching the number of Volunteers:', err);
      }
    );




    this.admin.TotalNumberOfBooking().subscribe(
      (resp: number) => {
        this.TotalNumberOfBooking = resp;
      },
      err => {
        console.error('Error fetching the number of Payment:', err);
      }
    );



    
  }


  openUsersComponent(){
    this.router.navigate(['admin/AllUsers']);
  }


  
  async fetchDataAndRenderChart() {
    await this.admin.GetTestimonyStatusCounts()
    const chartData = [this.admin.testemonyCounts[0].rejected_Count, this.admin.testemonyCounts[0].pending_Count, this.admin.testemonyCounts[0].accepted_Count];
    console.log('chartData', chartData)
    this.renderChart(chartData);
  }

  renderChart(chartData: number[]) {
    this.chart = new Chart("testimonyPieChart", {
      type: 'pie',
      data: {
        labels: ['Rejected', 'Pending', 'Accepted'],
        datasets: [{
          label: 'Testimonies Count',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  }

  onClick() {
    this.router.navigate(['/ManageTestimonial']);
  }

}
