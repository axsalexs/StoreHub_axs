import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';



// Partials
import { SidebarPartialComponent } from './partials/sidebar-partial/sidebar-partial';
import { HeaderPartialComponent } from './partials/header-partial/header-partial';
import { FooterPartialComponent } from './partials/footer-partial/footer-partial';
import { SHARED_IMPORTS } from './shared/shared.imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarPartialComponent,
    HeaderPartialComponent,
    FooterPartialComponent,
    ...SHARED_IMPORTS
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public showLayout = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Lista de pantallas que NO llevan Sidebar/Header
      const publicScreens = ['/landing-screen', '/login-screen', '/registro-screen', '/'];
      this.showLayout = !publicScreens.includes(event.urlAfterRedirects);
    });
  }
}
