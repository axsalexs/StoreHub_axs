import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-clients-list-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './clients-list-screen.html',
  styleUrl: './clients-list-screen.scss'
})
export class ClientsListScreenComponent implements OnInit {

  // Datos Dummy para visualizar la tabla
  public clientes = [
    { id: 1, nombre: 'Juan Pérez', telefono: '2221234567', email: 'juan.perez@email.com', compras: 5 },
    { id: 2, nombre: 'María García', telefono: '2229876543', email: 'm.garcia@outlook.com', compras: 12 },
    { id: 3, nombre: 'Roberto Hernández', telefono: '2215554433', email: 'roberto.h@gmail.com', compras: 1 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public editarCliente(id: number) {
    this.router.navigate(['/clients-form', id]);
  }

  public eliminarCliente(id: number) {
    if(confirm('¿Deseas eliminar este cliente del directorio?')) {
      this.clientes = this.clientes.filter(c => c.id !== id);
    }
  }
}
