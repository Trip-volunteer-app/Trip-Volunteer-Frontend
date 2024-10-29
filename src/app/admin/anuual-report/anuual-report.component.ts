import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-anuual-report',
  templateUrl: './anuual-report.component.html',
  styleUrls: ['./anuual-report.component.css']
})
export class AnuualReportComponent implements OnInit{

  // @ViewChild('myChart', { static: true }) myChart!: ElementRef<HTMLCanvasElement>;
  // private chart!: Chart;

  constructor (public admin:AdminService){
    // Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.admin.GetAllAnuualReport();


    
    // this.admin.GetAllAnuualReport2().subscribe(data => {
    //   const years = data.map((obj: any) => obj.trip_year);
    //   const revenues = data.map((obj: any) => obj.annual_revenue);

    //   // Chart configuration
    //   const config: ChartConfiguration = {
    //     type: 'line',
    //     data: {
    //       labels: years,
    //       datasets: [
    //         {
    //           label: 'Annual Revenue',
    //           data: revenues,
    //           borderColor: 'rgb(75, 192, 192)',
    //           backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //           fill: true,
    //           tension: 0.1
    //         }
    //       ]
    //     },
    //     options: {
    //       responsive: true,
    //       plugins: {
    //         legend: {
    //           display: true,
    //           position: 'top',
    //         },
    //         title: {
    //           display: true,
    //           text: 'Annual Revenue Report'
    //         }
    //       }
    //     }
    //   };

    //   // Create the chart instance
    //   this.chart = new Chart(this.myChart.nativeElement, config);
    // });


    

    
}


}