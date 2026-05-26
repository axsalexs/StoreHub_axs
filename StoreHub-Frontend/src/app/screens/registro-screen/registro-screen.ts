import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-registro-screen',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './registro-screen.html',
  styleUrls: ['./registro-screen.scss']
})
export class RegistroScreenComponent {
  registroForm: FormGroup;
  hidePassword = true;
  
  roles = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'cajero', viewValue: 'Cajero / Vendedor' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegister() {
    if (this.registroForm.valid) {
      const formValues = this.registroForm.value;

      const backendData = {
        username: formValues.email.split('@')[0],
        first_name: formValues.nombre,
        email: formValues.email,
        password: formValues.password,
        rol: formValues.rol // <- ¡El rol que nos faltaba!
      };

      this.authService.registrar(backendData).subscribe({
        next: (respuesta) => {
          console.log('¡Usuario creado en MySQL!', respuesta);
          alert('¡Registro exitoso! Ahora inicia sesión.');
          this.router.navigate(['/login-screen']);
        },
        error: (error) => {
          console.error('Error al registrar:', error);
          alert('Hubo un error. Puede que el correo o usuario ya existan.');
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}