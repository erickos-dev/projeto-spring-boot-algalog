import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [


  // Entrega
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/entrega/entrega.module').then(m => m.EntregaModule) },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule) },
    ]
  },


];
