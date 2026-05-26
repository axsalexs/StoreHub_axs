import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-header-partial',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './header-partial.html',
  styleUrl: './header-partial.scss'
})
export class HeaderPartialComponent implements OnInit {
  public fechaActual: Date = new Date();
  public nombreUsuario: string = "Alexs IT"; // Esto después vendrá de un servicio de auth

  constructor() {}

  ngOnInit(): void {
    // Actualizar la fecha cada minuto si es necesario
    setInterval(() => {
      this.fechaActual = new Date();
    }, 60000);
  }
}
