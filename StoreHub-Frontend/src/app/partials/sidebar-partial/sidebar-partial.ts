import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-sidebar-partial',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './sidebar-partial.html',
  styleUrl: './sidebar-partial.scss'
})
export class SidebarPartialComponent implements OnInit {
  // cámbialo a 'vendedor' para ver cómo desaparecen opciones
  public rolUsuario: string = 'admin';

  constructor() {}

  ngOnInit(): void {}
}
