import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-pos-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './sales-pos-screen.html',
  styleUrl: './sales-pos-screen.scss'
})
export class SalesPosScreenComponent implements OnInit {

  public textoBusqueda: string = '';

  // Simulamos datos que vendrían de la BD
  public productosDisponibles = [
    { id: 101, nombre: 'Coca Cola 600ml', precio: 18.50, stock: 40, categoria: 'Bebidas' },
    { id: 102, nombre: 'Papas Sabritas 45g', precio: 17.00, stock: 15, categoria: 'Snacks' },
    { id: 103, nombre: 'Gansito Marinela', precio: 15.50, stock: 8, categoria: 'Snacks' },
    { id: 104, nombre: 'Leche Alpura 1L', precio: 27.00, stock: 20, categoria: 'Lácteos' },
    { id: 105, nombre: 'Pepsi 1L', precio: 28.00, stock: 28, categoria: 'Bebidas' },
    { id: 106, nombre: 'Sangria 1L', precio: 32.00, stock: 12, categoria: 'Bebidas' },
    { id: 108, nombre: 'Fanta 1L', precio: 29.89, stock: 14, categoria: 'Bebidas' },
    { id: 109, nombre: 'Doritos 1L', precio: 20.00, stock: 25, categoria: 'Snacks' }

  ];

  public carrito: any[] = [];
  public totalVenta: number = 0;
  public fecha = new Date();

  // Lista que se muestra (La que filtramos)
  public productosFiltrados: any[] = [];

  constructor(private router: Router) {
    // Inicializamos aquí también por seguridad
    this.productosFiltrados = [...this.productosDisponibles];
  }

  ngOnInit(): void {
    this.productosFiltrados = [...this.productosDisponibles];
  }

  public filtrarProductos() {
    if (!this.textoBusqueda) {
      this.productosFiltrados = [...this.productosDisponibles];
      return;
    }

    const busqueda = this.textoBusqueda.toLowerCase();
    this.productosFiltrados = this.productosDisponibles.filter(p =>
      p.nombre.toLowerCase().includes(busqueda) ||
      p.id.toString().includes(busqueda)
    );
  }

  public agregarAlCarrito(producto: any) {
    // Verificar si ya existe en el ticket
    const itemEnCarrito = this.carrito.find(item => item.id === producto.id);

    if (itemEnCarrito) {
      if (itemEnCarrito.cantidad < producto.stock) {
        itemEnCarrito.cantidad++;
        itemEnCarrito.subtotal = itemEnCarrito.cantidad * itemEnCarrito.precio;
      } else {
        alert('No hay suficiente stock disponible');
      }
    } else {
      this.carrito.push({
        ...producto,
        cantidad: 1,
        subtotal: producto.precio
      });
    }
    this.actualizarTotal();
  }

  public eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.actualizarTotal();
  }

  private actualizarTotal() {
    this.totalVenta = this.carrito.reduce((acc, item) => acc + item.subtotal, 0);
  }

  public cobrar() {
    if (this.carrito.length > 0) {
      alert(`Venta procesada con éxito. Total: $${this.totalVenta.toFixed(2)}`);
      this.carrito = [];
      this.totalVenta = 0;
    }
  }

  public clientes = [
    { id: 1, nombre: 'Público General' },
    { id: 2, nombre: 'Juan Pérez' },
    { id: 3, nombre: 'María García' }
  ];

  public clienteSeleccionado: number = 1; // Por defecto Público General

  public nuevoCliente() {
    this.router.navigate(['/clients-form-screen']);
  }
}
