import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { DirectivesComponent } from './directives/directives.component';
import { TablesComponent } from './tables/tables.component';
import { ViewCardComponent } from '../components/view-card/view-card.component';
import { ModalComponent } from '../components/modal/modal.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:category/:id', component: ProductDetailsComponent },
  { path: 'directives', component: DirectivesComponent},
  { path: 'tables', component: TablesComponent},
  { path: 'tables/view-customer/:customerId', component: ViewCardComponent},
  { path: 'tables/add-user', component: ModalComponent},
  { path: 'tables/edit-user/:id', component: TablesComponent},
  { path: 'customers', component: CustomersComponent}
]



