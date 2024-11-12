import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { jsPDF } from 'jspdf';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import * as ExcelJS from 'exceljs';



@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Category'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    }
  };
  public dailyRevenueChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Revenue'
        }
      }
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    }
  };

  public lineChartType: ChartType = 'line';
  years: any[] = [];
  months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  selectedYear: number = 2024;
  selectedMonth: string = 'January';
  chart: any;

  public dailyRevenueChartLabels: string[] = [];
  public dailyRevenueChartData: ChartData<'line'> = {
    labels: this.dailyRevenueChartLabels,
    datasets: [
      {
        data: [],
        label: 'Daily Revenue',
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      }
    ]
  };

  @ViewChild(BaseChartDirective) chartDirective: BaseChartDirective | undefined;

  constructor(public admin: AdminService) { }

  async ngOnInit(): Promise<void> {
    await this.admin.getMonthlyReport('01', '2024');
    await this.admin.GetDistinctTripYears();
    this.years = this.admin.mappedYears;
    this.admin.GetDailyRevenueForMonth('11', '2024');
  }

  public barChartLabels = ['Expenses', 'Revenue'];
  public barChartType: ChartType = 'bar';
  public barChartType2: ChartType = 'line';

  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0],
        label: 'Series A'
      }
    ]
  };
  public netRevenuePlugin = {
    id: 'netRevenuePlugin',
    afterDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      if (ctx && chartArea && this.chart && this.chart.monthly_revenue != null) {
        const { top, right } = chartArea;

        ctx.save();
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(
          `Net Revenue: ${this.chart.monthly_revenue}`,
          right - 150, 
          top + 20 
        );
        ctx.restore();
      }
    }
  };

  async loadMonthlyReport(): Promise<void> {
    const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
    const monthString = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
    await this.admin.getMonthlyReport(monthString, `${this.selectedYear}`);
    await this.admin.GetDailyRevenueForMonth(monthString, `${this.selectedYear}`);
  }
  chart2: any;
  async onYearMonthChange(): Promise<void> {
    await this.loadMonthlyReport();

    if (this.admin.monthlyReport && this.admin.monthlyReport.length > 0) {
      this.chart = this.admin.monthlyReport[0];
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: [this.chart.cost || 0, this.chart.total_revenue || 0],
            label: 'Series A'
          }
        ]
      };
    }
    await this.loadMonthlyReport();

    if (this.admin.dayReport) {
      const chartData = await this.admin.dayReport.map((entry: any) => entry.revenue || 0);
      const chartLabels = await this.admin.dayReport.map((entry: any) => entry.day || '');

      this.dailyRevenueChartData = {
        labels: chartLabels,
        datasets: [
          {
            data: chartData,
            label: 'Daily Revenue',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1,
          }
        ]
      };
      this.chartDirective?.chart?.update();
    }
  }



  ngAfterViewInit() {
    Chart.register(this.netRevenuePlugin);
  }

  ngOnDestroy() {
    Chart.unregister(this.netRevenuePlugin);
  }

  generatePDF() {
    const chartElement1 = document.getElementById('chart');
    const chartElement2 = document.getElementById('dailyRevenueChart');
  
    if (chartElement1 && chartElement2) {
      html2canvas(chartElement1).then((canvas1) => {
        const imgData1 = canvas1.toDataURL('image/png');
  
        html2canvas(chartElement2).then((canvas2) => {
          const imgData2 = canvas2.toDataURL('image/png');
          const doc = new jsPDF();
  
          doc.setFontSize(16);
          doc.text("Monthly Financial Report", 105, 15, { align: "center" });
  
          doc.setFontSize(12);
          doc.setTextColor(40);
          doc.setDrawColor(80);
          doc.roundedRect(10, 20, 190, 41, 3, 3);
          doc.text("Financial Summary", 15, 27);
          doc.setFontSize(10);
          doc.text(`Month: ${this.selectedMonth}`, 15, 35);
          doc.text(`Year: ${this.selectedYear}`, 15, 41);
          doc.text(`Total Revenue: ${this.chart.total_revenue}`, 15, 47);
          doc.text(`Cost: ${this.chart.cost}`, 15, 53);
          doc.text(`Net Revenue: ${this.chart.monthly_revenue}`, 15, 59);
  
          doc.setDrawColor(180);
          doc.line(10, 60, 200, 60);
  
          doc.setFontSize(12);
          doc.setTextColor(40);
          doc.text("Monthly Overview Chart", 15, 68);
          doc.addImage(imgData1, 'PNG', 15, 73, 180, 80);
  
          doc.line(10, 160, 200, 160);
  
          doc.text("Daily Revenue Chart", 15, 168);
          doc.addImage(imgData2, 'PNG', 15, 173, 180, 80);
  
          doc.setFontSize(10);
          doc.setTextColor(120);
          doc.text("Generated on: " + new Date().toLocaleDateString(), 15, 265);
  
          doc.save('monthly-report.pdf');
        });
      });
    }
  }
  
  

  async exportToExcel() {
    const chartElement1 = document.getElementById('chart');
    if (!chartElement1) return;
  
    const canvas1 = await html2canvas(chartElement1);
    const imageBase64_1 = canvas1.toDataURL('image/png');
  
    const chartElement2 = document.getElementById('dailyRevenueChart');
    if (!chartElement2) return;
  
    const canvas2 = await html2canvas(chartElement2);
    const imageBase64_2 = canvas2.toDataURL('image/png');
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Monthly Report');
  
    worksheet.addRow(['Monthly Report']);
    worksheet.addRow(['Year', 'Total Cost', 'Total Revenue', 'Net Revenue']);
    worksheet.addRow([this.selectedYear, this.chart.cost, this.chart.total_revenue, this.chart.monthly_revenue]);
  
    const imageId1 = workbook.addImage({
      base64: imageBase64_1,
      extension: 'png', 
    });
  
    worksheet.addImage(imageId1, {
      tl: { col: 0, row: 4 },
      ext: { width: 500, height: 300 }
    });
  
    const imageId2 = workbook.addImage({
      base64: imageBase64_2,
      extension: 'png',
    });
  
    worksheet.addImage(imageId2, {
      tl: { col: 8, row: 4 },
      ext: { width: 500, height: 300 }
    });
    worksheet.getColumn(1).width = 15; 
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Monthly_Report_${this.selectedYear}_${this.selectedMonth}.xlsx`;
    link.click();
  }
}  