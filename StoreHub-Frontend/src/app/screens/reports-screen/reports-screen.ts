import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './reports-screen.html',
  styleUrl: './reports-screen.scss'
})
export class ReportsScreenComponent implements OnInit {
  @ViewChild('salesChart') salesChart!: ElementRef;
  @ViewChild('categoryChart') categoryChart!: ElementRef;

  public resumen = {
    totalVentas: 15420.50,
    numVentas: 124,
    ticketPromedio: 124.35,
    productoEstrella: 'Coca Cola 600ml'
  };

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.renderSalesChart();
    this.renderCategoryChart();
  }

  renderSalesChart() {
    new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
          label: 'Ventas de la Semana ($)',
          data: [1200, 1900, 1500, 2100, 2800, 3500, 2400],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    });
  }

  renderCategoryChart() {
    new Chart(this.categoryChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Bebidas', 'Snacks', 'Lácteos', 'Limpieza'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b']
        }]
      }
    });
  }
}
