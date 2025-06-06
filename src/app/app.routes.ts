import { Routes } from '@angular/router';

import { HomeComponent } from './modules/outer/pages/home/home.component';
import { DirectivesComponent } from './modules/outer/pages/directives/directives.component';
import { GalleryComponent } from './modules/outer/pages/gallery/gallery.component';
import { ProductDetailsComponent } from './modules/outer/components/product-details/product-details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TablesComponent } from './modules/outer/pages/tables/tables.component';
import { LoginComponent } from './modules/outer/pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:category/:id', component: ProductDetailsComponent },
  { path: 'directives', component: DirectivesComponent},
  { path: 'tables', component: TablesComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent }
];
