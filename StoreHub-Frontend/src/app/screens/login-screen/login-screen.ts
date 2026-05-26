import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss'
})
export class LoginScreenComponent {
  public loginForm: FormGroup;
  public hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      // Toma la primera parte del correo como username (Ej: alex@store.com -> alex)
      const credenciales = {
        username: formValues.email.split('@')[0],
        password: formValues.password
      };

      this.authService.login(credenciales).subscribe({
        next: (respuesta: any) => {
          console.log('¡Login exitoso!', respuesta);

          // --- MODIFICACIÓN: Django devuelve "token", no "access" ---
          this.authService.guardarToken(respuesta.token);
          // ----------------------------------------------------------

          // --- OPCIONAL PERO MUY ÚTIL: Guardar el rol y nombre para el Navbar/Sidebar ---
          // Como Django nos devuelve estos datos, podemos guardarlos para mostrarlos en el Frontend
          localStorage.setItem('usuario_nombre', `${respuesta.first_name} ${respuesta.last_name}`);
          localStorage.setItem('usuario_rol', respuesta.rol_perfil);
          // ------------------------------------------------------------------------------

          this.router.navigate(['/dashboard-screen']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
