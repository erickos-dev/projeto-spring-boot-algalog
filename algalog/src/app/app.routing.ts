import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [


    // Auth routes for guests
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', loadChildren: () => import('src/app/modules/entrega/entrega.module').then(m => m.EntregaModule) },
        ]
    },


];
