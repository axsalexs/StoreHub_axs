import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-products-form-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './products-form-screen.html',
  styleUrl: './products-form-screen.scss'
})

  export class ProductsFormScreenComponent implements OnInit {

  public productoForm: FormGroup;
  public categorias: any[] = []; 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.productoForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)
      ]],
      categoria: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0.1), Validators.max(999.99)]],
      stock: ['', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]],
      descripcion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  private cargarCategorias() {
    this.authService.listarCategorias().subscribe({
      next: (data) => { this.categorias = data; },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  public validarNombre(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    // 1. Solo permite letras
    valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');

    // 2. No permite espacios al inicio
    if (valor.startsWith(' ')) {
      valor = valor.trim();
    }

    // 3. No permite mas de un espacio seguido
    valor = valor.replace(/\s{2,}/g, ' ');

    // 4. Limita a 30 caracteres
    if (valor.length > 30) {
      valor = valor.substring(0, 30);
    }

    // Actualizamos el valor en el formulario y en el input físico
    input.value = valor;
    this.productoForm.get('nombre')?.setValue(valor);
  }

  // Logica para el punto automático en el precio
  public formatearPrecio(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Solo números
    if (valor.length > 5) valor = valor.substring(0, 5); // Máximo 999.99

    if (valor.length > 2) {
      const enteros = valor.substring(0, valor.length - 2);
      const decimales = valor.substring(valor.length - 2);
      valor = `${enteros}.${decimales}`;
    }

    this.productoForm.get('precio')?.setValue(valor, { emitEvent: false });
  }

  // Logica para limpiar espacios dobles o vacios en el nombre
  public validarEspacios(event: any) {
    const input = event.target as HTMLInputElement;
    // No permite espacio al inicio y limita a 30 caracteres
    if (input.value.startsWith(' ')) {
      input.value = input.value.trim();
    }
    if (input.value.length > 30) {
      input.value = input.value.substring(0, 30);
    }
    this.productoForm.get('nombre')?.setValue(input.value);
  }

  public validarStock(event: any) {
    const input = event.target as HTMLInputElement;
    // Borra instantáneamente cualquier cosa que NO sea un número
    let valor = input.value.replace(/[^0-9]/g, '');

    // Limita físicamente a 3 díditos (máx 999)
    if (valor.length > 3) {
      valor = valor.substring(0, 3);
    }

    input.value = valor;
    this.productoForm.get('stock')?.setValue(valor);
  }

  public guardarProducto() {
    if (this.productoForm.valid) {
      const formValues = this.productoForm.value;

      const nuevoProducto = {
        nombre: formValues.nombre,
        descripcion: formValues.descripcion || "Sin descripción",
        codigo_barras: Math.floor(1000000000 + Math.random() * 9000000000).toString(), // Generador básico temporal
        precio_venta: parseFloat(formValues.precio),
        costo_adquisicion: parseFloat(formValues.precio) * 0.8,
        stock: parseInt(formValues.stock),
        categoria: parseInt(formValues.categoria) // Envía el ID real
      };

      this.authService.registrarProducto(nuevoProducto).subscribe({
        next: (res) => {
          console.log('¡Producto guardado exitosamente!', res);
          this.router.navigate(['/productos-screen']);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Hubo un error al guardar el producto.');
        }
      });
    } else {
      this.productoForm.markAllAsTouched();
    }
  }


  public cancelar() {
    this.router.navigate(['/products-list-screen']);
  }
}
