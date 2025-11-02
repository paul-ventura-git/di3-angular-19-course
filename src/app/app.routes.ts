import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/outer/components/layout/layout.component').then(m => m.LayoutComponent),
    loadChildren: () => import('./modules/outer/pages/pages.routes').then(m => m.routes),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login'),
  },
  {
    canMatch: [authGuard],
    path: 'intranet',
    loadComponent: () => import('./modules/inner/pages/page-layout'),
    loadChildren: () => import('./modules/inner/pages/page.routes'),
  },
  { path: '**', component: NotFoundComponent }
];


