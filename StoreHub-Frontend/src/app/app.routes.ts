import { Routes } from '@angular/router';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen';
import { LoginScreenComponent } from './screens/login-screen/login-screen';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen';
import { HeaderPartialComponent } from './partials/header-partial/header-partial';
import { SidebarPartialComponent } from './partials/sidebar-partial/sidebar-partial';
import { FooterPartialComponent } from './partials/footer-partial/footer-partial';
import { DashboardScreenComponent } from './screens/dashboard-screen/dashboard-screen';
import { ProductsListScreenComponent } from './screens/products-list-screen/products-list-screen';
import { ProductsFormScreenComponent } from './screens/products-form-screen/products-form-screen';
import { CategoriesListScreenComponent } from './screens/categories-list-screen/categories-list-screen';
import { ClientsListScreenComponent } from './screens/clients-list-screen/clients-list-screen';
import { ClientsFormScreenComponent } from './screens/clients-form-screen/clients-form-screen';
import { SalesPosScreenComponent } from './screens/sales-pos-screen/sales-pos-screen';
import { SalesHistoryScreenComponent } from './screens/sales-history-screen/sales-history-screen';
import { InventoryMovementsScreenComponent } from './screens/inventory-movements-screen/inventory-movements-screen';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen';
import { ProfileScreenComponent } from './screens/profile-screen/profile-screen';

export const routes: Routes = [
  { path: '', redirectTo: 'landing-screen', pathMatch: 'full' },
  { path: 'landing-screen', component: LandingScreenComponent },
  { path: 'login-screen', component: LoginScreenComponent },
  { path: 'registro-screen', component: RegistroScreenComponent },
  { path: 'dashboard-screen', component: DashboardScreenComponent },
  { path: 'products-list-screen', component: ProductsListScreenComponent },
  { path: 'producto-nuevo', component: ProductsFormScreenComponent },
  { path: 'producto-editar/:id', component: ProductsFormScreenComponent },
  { path: 'categories-list-screen', component: CategoriesListScreenComponent },
  { path: 'clients-list-screen', component: ClientsListScreenComponent },
  { path: 'clients-form-screen', component: ClientsFormScreenComponent },
  { path: 'clients-form-screen/:id', component: ClientsFormScreenComponent },
  { path: 'sales-pos-screen', component: SalesPosScreenComponent },
  { path: 'sales-history-screen', component: SalesHistoryScreenComponent },
  { path: 'inventory-movements-screen', component: InventoryMovementsScreenComponent },
  { path: 'reports-screen', component: ReportsScreenComponent },
  { path: 'profile-screen', component: ProfileScreenComponent },


  /*Partials
  { path: 'header-partial', component: HeaderPartialComponent },
  { path: 'sidebar-partial', component: SidebarPartialComponent },
  { path: 'footer-partial', component: FooterPartialComponent },
  */

];
