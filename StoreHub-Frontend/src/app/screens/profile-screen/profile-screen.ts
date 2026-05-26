import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-profile-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './profile-screen.html',
  styleUrl: './profile-screen.scss'
})
export class ProfileScreenComponent implements OnInit {
  public profileForm: FormGroup;

  // Datos simulados
  public usuario = {
    nombre: 'Alexandro Gonzalez',
    correo: 'alexandro.gonzalez@alumno.buap',
    rol: 'Administrador',
    fechaIngreso: new Date('2025-10-15'),
    foto: null // url de la imagen
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      // Nombre obligatorio maximo 40
      nombre: [this.usuario.nombre, [Validators.required, Validators.maxLength(40)]],
      // Correo obligatorio formato email
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
      // Password obligatorio
      passwordActual: ['', [Validators.required]],
      // Nueva Password mínimo 8
      nuevaPassword: ['', [Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {}

  // ==========================================
  // VALIDACIONES
  // ==========================================

  // Solo letras, sin doble espacio, max 40 caracteres
  public validarNombre(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');

    if (valor.startsWith(' ')) valor = valor.trim();
    valor = valor.replace(/\s{2,}/g, ' ');

    if (valor.length > 40) valor = valor.substring(0, 40);

    input.value = valor;
    this.profileForm.get('nombre')?.setValue(valor);
  }

  // Bloquear espacios
  public validarPassword(event: any, controlName: string) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\s/g, '');

    if (valor.length > 16) valor = valor.substring(0, 16);

    input.value = valor;
    this.profileForm.get(controlName)?.setValue(valor);
  }

  public guardarCambios() {
    if (this.profileForm.valid) {
      console.log('Actualizando perfil...', this.profileForm.value);
      alert('Perfil actualizado correctamente');
    } else {
      // Si intentan trampear el botón, forzamos la validación
      this.profileForm.markAllAsTouched();
    }
  }
}
