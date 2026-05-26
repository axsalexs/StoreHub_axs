import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-inventory-movements-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './inventory-movements-screen.html',
  styleUrl: './inventory-movements-screen.scss'
})

export class InventoryMovementsScreenComponent implements OnInit {
  
  public movementForm: FormGroup;

  // Datos simulados de productos para el selector
  public productos = [
    { id: 101, nombre: 'Coca Cola 600ml', stock: 40 },
    { id: 102, nombre: 'Papas Sabritas 45g', stock: 15 }
  ];

  public tiposMovimiento = ['Entrada', 'Salida', 'Ajuste'];

  public historialMovimientos = [
    { id: 1, fecha: new Date(), producto: 'Coca Cola 600ml', tipo: 'Entrada', cantidad: 10, motivo: 'Compra a proveedor' },
    { id: 2, fecha: new Date(), producto: 'Papas Sabritas 45g', tipo: 'Salida', cantidad: 2, motivo: 'Producto caducado' }
  ];

  constructor(private fb: FormBuilder) {
    this.movementForm = this.fb.group({
      productoId: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      motivo: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {}

  public registrarMovimiento() {
    if (this.movementForm.valid) {
      console.log('Registrando movimiento:', this.movementForm.value);
      // Aquí iría la lógica para actualizar el stock en la BD
      this.movementForm.reset();
    }
  }
}
