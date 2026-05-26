import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './clients-form-screen.html',
  styleUrl: './clients-form-screen.scss' // Asegúrate de que esté referenciado
})
export class ClientsFormScreenComponent implements OnInit {
  public clientForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.clientForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {}

  // Validación reactiva de nombre (Solo letras, máx 30)
  public validarNombre(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    if (valor.startsWith(' ')) valor = valor.trim();
    valor = valor.replace(/\s{2,}/g, ' ');
    if (valor.length > 30) valor = valor.substring(0, 30);

    input.value = valor;
    this.clientForm.get('nombre')?.setValue(valor);
  }

  // Validación reactiva de teléfono (Solo números, máx 10)
  public validarTelefono(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9]/g, '');
    if (valor.length > 10) valor = valor.substring(0, 10);

    input.value = valor;
    this.clientForm.get('telefono')?.setValue(valor);
  }

  public guardar() {
    if (this.clientForm.valid) {
      console.log('Cliente registrado:', this.clientForm.value);
      this.router.navigate(['/clients-list-screen']);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
