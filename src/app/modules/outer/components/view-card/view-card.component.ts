import { Component, computed, inject, input } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-card',
  imports: [],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent {
  customerId = input.required<string>();
  private customersService = inject(UserService); // Assuming you have a service to fetch customer data

  customerName$ = this.customersService.getUsers().pipe(
    map(users => users.find((u: any) => u.id === this.customerId())?.name)
  );
}
