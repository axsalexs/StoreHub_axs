import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './dashboard-screen.html',
  styleUrl: './dashboard-screen.scss'
})
export class DashboardScreenComponent implements OnInit, AfterViewInit {
  @ViewChild('salesLineChart') salesLineChart!: ElementRef;

  public stats = [
    { label: 'Ventas del Día', value: '$12,450.00', icon: 'payments', color: '#f37021' },
    { label: 'Nuevos Clientes', value: '12', icon: 'person_add', color: '#2d2d2d' },
    { label: 'Productos en Stock', value: '1,240', icon: 'inventory_2', color: '#2d2d2d' },
    { label: 'Ticket Promedio', value: '$245.50', icon: 'trending_up', color: '#2d2d2d' }
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initChart();
  }

  private initChart() {
    new Chart(this.salesLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
        datasets: [{
          label: 'Ventas en Tiempo Real',
          data: [2100, 4500, 3200, 7800, 5600, 9100, 4200],
          borderColor: '#f37021',
          backgroundColor: 'rgba(243, 112, 33, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#f37021'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}
