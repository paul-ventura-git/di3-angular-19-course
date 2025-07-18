import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { HomeComponent } from './modules/outer/pages/home/home.component';
import { DirectivesComponent } from './modules/outer/pages/directives/directives.component';
import { GalleryComponent } from './modules/outer/pages/gallery/gallery.component';
import { ProductDetailsComponent } from './modules/outer/components/product-details/product-details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TablesComponent } from './modules/outer/pages/tables/tables.component';
import { LoginComponent } from './modules/outer/pages/login/login.component';
import { FetchingComponent } from './modules/outer/pages/fetching/fetching.component';
import { ModalComponent } from './modules/outer/components/modal/modal.component';
import { ViewCardComponent } from './modules/outer/components/view-card/view-card.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login'),
  },
  {
    canMatch: [authGuard],
    path: '',
    loadComponent: () => import('./modules/inner/pages/page-layout'),
    loadChildren: () => import('./modules/inner/pages/page.routes'),
  },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:category/:id', component: ProductDetailsComponent },
  { path: 'directives', component: DirectivesComponent},
  { path: 'tables', component: TablesComponent},
  { path: 'tables/view-customer/:customerId', component: ViewCardComponent},
  { path: 'tables/add-user', component: ModalComponent},
  { path: 'tables/edit-user/:id', component: TablesComponent},
  { path: 'fetching', component: FetchingComponent}
];
