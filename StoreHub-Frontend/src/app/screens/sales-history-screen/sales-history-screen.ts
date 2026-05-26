import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './sales-history-screen.html',
  styleUrl: './sales-history-screen.scss'
})
export class SalesHistoryScreenComponent implements OnInit {
  public rolUsuario: string = 'admin'; // Para control de acciones

  public historialVentas = [
    { folio: 'V-001', fecha: new Date('2026-04-10T10:30:00'), cliente: 'Juan Pérez', total: 450.50, articulos: 3 },
    { folio: 'V-002', fecha: new Date('2026-04-10T11:15:00'), cliente: 'Público General', total: 85.00, articulos: 1 },
    { folio: 'V-003', fecha: new Date('2026-04-09T18:45:00'), cliente: 'María García', total: 1240.00, articulos: 12 },
    { folio: 'V-004', fecha: new Date('2026-04-09T14:20:00'), cliente: 'Público General', total: 320.00, articulos: 4 },
  ];

  constructor() {}

  ngOnInit(): void {}

  public verDetalle(folio: string) {
    console.log('Mostrando detalle de la venta:', folio);
    // Aquí podrías abrir un modal con la lista de productos de esa venta
  }
}
