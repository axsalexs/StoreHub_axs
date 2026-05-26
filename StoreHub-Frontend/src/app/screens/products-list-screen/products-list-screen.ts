import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-products-list-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './products-list-screen.html',
  styleUrl: './products-list-screen.scss'
})
export class ProductsListScreenComponent implements OnInit {

  public rolUsuario: string = 'admin'; // Por ahora lo quemamos como admin

  // Datos de prueba (Dummy)
  public productos = [
    { id: 1, nombre: 'Coca Cola 600ml', categoria: 'Bebidas', precio: 18.50, stock: 45, imagen: 'https://via.placeholder.com/50' },
    { id: 2, nombre: 'Papas Sabritas Sal', categoria: 'Snacks', precio: 17.00, stock: 12, imagen: 'https://via.placeholder.com/50' },
    { id: 3, nombre: 'Leche Entera 1L', categoria: 'Lácteos', precio: 26.00, stock: 5, imagen: 'https://via.placeholder.com/50' },
  ];

  constructor() { }

  ngOnInit(): void { }

  // Métodos para las acciones
  public editarProducto(id: number) {
    console.log('Editando producto:', id);
  }

  public eliminarProducto(id: number) {
    if(confirm('¿Estás seguro de eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
    }
  }
}
