import { Routes } from '@angular/router';
import { DirectivesComponent } from './directives/directives.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { ServicesComponent } from './services/services.component';
import { SignalsComponent } from './signals/signals.component';
import { ObservablesComponent } from './observables/observables.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DependencyInjectionComponent } from './dependency-injection/dependency-injection.component';
import { HttpMethodsComponent } from './http-methods/http-methods.component';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { RxjsComponent } from './rxjs/rxjs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'directives', component: DirectivesComponent},
  { path: 'signals', component: SignalsComponent},
  { path: 'rxjs', component: RxjsComponent },
  { path: 'reactive-forms', component: ReactiveFormsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/dependency-injection', component: DependencyInjectionComponent },
  { path: 'services/observables', component: ObservablesComponent },
  { path: 'services/subscriptions', component: SubscriptionsComponent },
  { path: 'services/http-methods', component: HttpMethodsComponent },
  { path: '**', component: NotFoundComponent }
]



