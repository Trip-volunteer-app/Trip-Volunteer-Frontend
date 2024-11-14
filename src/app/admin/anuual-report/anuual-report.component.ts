import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js';
import * as ExcelJS from 'exceljs';


@Component({
  selector: 'app-anuual-report',
  templateUrl: './anuual-report.component.html',
  styleUrls: ['./anuual-report.component.css']
})
export class AnuualReportComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Total-Revenue VS Expenses'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    }
  };
  public MonthlyRevenueChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
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


  selectedYear: any = 'Year';
  chart: any;
  public MonthlyRevenueChartLabels: string[] = [];
  public MonthlyRevenueChartData: ChartData<'line'> = {
    labels: this.MonthlyRevenueChartLabels,
    datasets: [
      {
        data: [],
        label: 'Monthly Revenue',
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      }
    ]
  };

  @ViewChild(BaseChartDirective) chartDirective: BaseChartDirective | undefined;
  constructor(public admin: AdminService) { }

  years: any[] = [];
  async ngOnInit(): Promise<void> {
    await this.admin.GetDistinctTripYears();
    this.years = this.admin.mappedYears;
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
      if (ctx && chartArea && this.chart && this.chart.net_Revenue != null) {
        const { top, right } = chartArea;
        ctx.save();
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(
          `Net Revenue: ${this.chart.net_Revenue}`,
          right - 150,
          top + 20
        );
        ctx.restore();
      }
    }
  };

  async loadAnnualReport(): Promise<void> {
    await this.admin.GetYearlyRevenue(`${this.selectedYear}`);
    await this.admin.GetMonthlyRevenueForYear(`${this.selectedYear}`);
  }
  chart2: any;
  async onYearChange(): Promise<void> {
    await this.loadAnnualReport();
    if (this.admin.annualReport && this.admin.annualReport.length > 0) {
      this.chart = this.admin.annualReport[0];
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: [this.chart.cost || 0, this.chart.total_Revenue || 0],
            label: 'Series A'
          }
        ]
      };
    }
    await this.loadAnnualReport();
    if (this.admin.monthReport) {
      const chartData = await this.admin.monthReport.map((entry: any) => entry.net_Revenue || 0);
      const chartLabels = await this.admin.monthReport.map((entry: any) => entry.month || '');
      this.MonthlyRevenueChartData = {
        labels: chartLabels,
        datasets: [
          {
            data: chartData,
            label: 'Monthly Revenue',
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
    const chartElement2 = document.getElementById('MonthlyRevenueChart');
    if (chartElement1 && chartElement2) {
      html2canvas(chartElement1).then((canvas1) => {
        const imgData1 = canvas1.toDataURL('image/png');
        html2canvas(chartElement2).then((canvas2) => {
          const imgData2 = canvas2.toDataURL('image/png');
          const doc = new jsPDF();
          doc.setFontSize(18);
          doc.text("Annual Financial Report", 105, 15, { align: "center" });
          doc.setFontSize(12);
          doc.setTextColor(40);
          doc.setDrawColor(100);
          doc.roundedRect(10, 25, 190, 37, 3, 3);
          doc.text("Financial Summary", 15, 32);
          doc.setFontSize(10);
          doc.text(`Year: ${this.selectedYear}`, 15, 40);
          doc.text(`Total Revenue: ${this.chart.total_Revenue}`, 15, 46);
          doc.text(`Total Cost: ${this.chart.cost}`, 15, 52);
          doc.text(`Net Revenue: ${this.chart.net_Revenue}`, 15, 58);
          doc.setDrawColor(200);
          doc.line(10, 65, 200, 65);
          doc.setFontSize(12);
          doc.setTextColor(40);
          doc.text("Annual Revenue and Cost Overview", 15, 72);
          doc.addImage(imgData1, 'PNG', 15, 77, 180, 80);
          doc.line(10, 160, 200, 160);
          doc.text("Monthly Revenue Breakdown", 15, 167);
          doc.addImage(imgData2, 'PNG', 15, 172, 180, 80);
          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text("Generated on: " + new Date().toLocaleDateString(), 15, 265);
          doc.save('annual-report.pdf');
        });
      });
    }
  }

  hasNonZeroRevenue(): boolean {
    return this.admin.annualReport.some((item: any) => item.totalRevenue !== 0);
  }

  async exportToExcel() {
    const chartElement1 = document.getElementById('chart');
    if (!chartElement1) return;
    const canvas1 = await html2canvas(chartElement1);
    const imageBase64_1 = canvas1.toDataURL('image/png');
    const chartElement2 = document.getElementById('MonthlyRevenueChart');
    if (!chartElement2) return;
    const canvas2 = await html2canvas(chartElement2);
    const imageBase64_2 = canvas2.toDataURL('image/png');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Annual Report');
    worksheet.addRow(['Annual Report']);
    worksheet.addRow(['Year', 'Total Cost', 'Total Revenue', 'Net Revenue']);
    worksheet.addRow([this.selectedYear, this.chart.cost, this.chart.total_Revenue, this.chart.net_Revenue]);
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
      tl: { col: 6, row: 4 },
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
    link.download = `Annual${this.selectedYear}.xlsx`;
    link.click();
  }
}