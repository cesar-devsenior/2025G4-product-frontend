import { Routes } from '@angular/router';
import { ProductoListComponent } from './component/producto-list.component';
import { ProductoFormComponent } from './component/producto-form.component';
import { Error404Component } from './component/error-404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    component: ProductoListComponent
  },
  {
    path: 'productos/nuevo',
    component: ProductoFormComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];
