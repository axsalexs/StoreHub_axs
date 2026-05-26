import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-footer-partial',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './footer-partial.html',
  styleUrl: './footer-partial.scss'
})
export class FooterPartialComponent {
  public anioActual: number = new Date().getFullYear();
}
