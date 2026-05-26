import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-categories-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './categories-list-screen.html',
  styleUrl: './categories-list-screen.scss'
})
export class CategoriesListScreenComponent implements OnInit {

  public rolUsuario: string = 'admin';

  public categoryForm: FormGroup;
  public categories = [
    { id: 1, nombre: 'Bebidas', descripcion: 'Refrescos, jugos y aguas' },
    { id: 2, nombre: 'Snacks', descripcion: 'Frituras y botanas' },
    { id: 3, nombre: 'Lácteos', descripcion: 'Leche, quesos y derivados' }
  ];

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {}

  // Limpieza automática: Solo letras, máx 20, sin espacios dobles o al inicio
  public validarNombre(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');

    if (valor.startsWith(' ')) {
      valor = valor.trim();
    }

    valor = valor.replace(/\s{2,}/g, ' ');

    if (valor.length > 20) {
      valor = valor.substring(0, 20);
    }

    input.value = valor;
    this.categoryForm.get('nombre')?.setValue(valor);
  }

  public agregarCategoria() {
    if (this.categoryForm.valid) {
      const nueva = {
        id: this.categories.length + 1,
        ...this.categoryForm.value
      };
      this.categories.push(nueva);
      this.categoryForm.reset();
    }
  }

  public eliminarCategoria(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}
