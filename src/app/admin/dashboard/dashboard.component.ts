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
    this.admin.GetNetRevenuePerCategory();
    this.admin.GetAverageRatingPerCategory();
    this.fetchDataAndRenderChartNetRevenue();
    this.fetchDataAndRenderChart();
    this.admin.GetTotalUsersPerCategory();
    this.fetchDataAndRenderChart2();
    this.fetchDataAndRenderChartaverageRatingPerCategory();

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

  async fetchDataAndRenderChart2() {
    await this.admin.GetTotalUsersPerCategory()
    const chartData = this.admin.totalUsersPerCategory.map((item: any) => item.total_users || 0);
    const labels = this.admin.totalUsersPerCategory.map((item: any) => item.category_Name || 'Unknown');
    console.log('55555555555555555555',chartData)
    this.renderChart2(chartData, labels);
  }

  renderChart2(chartData: number[], labels: string[]) {
    new Chart('myChart', {
      type: 'doughnut', // Change to 'pie' for a pie chart instead
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Users',
            data: chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  async fetchDataAndRenderChartaverageRatingPerCategory() {
    await this.admin.GetAverageRatingPerCategory()
    const chartData = this.admin.averageRatingPerCategory.map((item: any) => item.avg_category_rating || 0);
    const labels = this.admin.averageRatingPerCategory.map((item: any) => {
      const categoryName = item.category_Name || 'Unknown';
      return categoryName.split(' ')[0]; // Take the first part before the space
    });    console.log('444444444445555555555',chartData)
    this.renderChartaverageRatingPerCategory(chartData, labels);
  }

  renderChartaverageRatingPerCategory(chartData: number[], labels: string[]) {
    new Chart('rateChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Rating',
            data: chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }


  onClick() {
    this.router.navigate(['/ManageTestimonial']);
  }
  async fetchDataAndRenderChartNetRevenue() {
    await this.admin.GetNetRevenuePerCategory()
    const chartData = this.admin.netRevenuePerCategory.map((item: any) => item.net_revenue || 0);
    const labels = this.admin.netRevenuePerCategory.map((item: any) => item.category_Name || 'Unknown');
    console.log('revenuechart',chartData)
    this.renderChartNetRevenue(chartData, labels);
  }

  renderChartNetRevenue(chartData: number[], labels: string[]) {
    new Chart('revenueChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Net Revenue',
            data: chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
}

