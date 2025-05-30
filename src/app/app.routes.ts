import { Routes } from '@angular/router';

import { HomeComponent } from './modules/outer/pages/home/home.component';
import { GalleryComponent } from './modules/outer/pages/gallery/gallery.component';
import { ProductDetailsComponent } from './modules/outer/components/product-details/product-details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:category/:id', component: ProductDetailsComponent },
  { path: '**', component: NotFoundComponent }
];
