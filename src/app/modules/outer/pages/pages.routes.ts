import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { DirectivesComponent } from './directives/directives.component';
import { ViewCardComponent } from '../components/view-card/view-card.component';
import { ModalComponent } from '../components/modal/modal.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:category/:id', component: ProductDetailsComponent },
  { path: 'directives', component: DirectivesComponent},
  { path: 'tables/view-customer/:customerId', component: ViewCardComponent},
  { path: 'tables/add-user', component: ModalComponent},
]



