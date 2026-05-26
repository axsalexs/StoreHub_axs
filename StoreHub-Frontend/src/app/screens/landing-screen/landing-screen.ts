import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-landing-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './landing-screen.html',
  styleUrl: './landing-screen.scss'
})
export class LandingScreenComponent {}
