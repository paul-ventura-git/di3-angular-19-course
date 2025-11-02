import {
  Component,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { User } from '../../../../../backend-vet'; // Adjust the import path as necessary

@Component({
  selector: 'app-header-selector',
  template: `
  <nav class="navbar navbar-expand-lg bg-body-tertiary pb-3">
    <div class="collapse navbar-collapse container" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <span (click)="showMenu.set(!showMenu())"> Welcome, {{ currentUser()?.name }} </span>
      <div class="btn-group mx-4" role="group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
          Change User
        </button>
        <ul class="dropdown-menu">
          @for(user of users(); track user.id) {
          <li>
            <a class="dropdown-item" (click)="emitUser(user)">{{ user.name }}</a>
          </li>
          }
          <li>
            <a class="dropdown-item" (click)="logout.emit(); showMenu.set(false)">Logout</a>
        </ul>
      </div>
    </div>
  </nav>
  `,
})
export default class HeaderSelector implements OnInit, OnDestroy {
  showMenu = signal(false);

  users = input.required<User[]>();

  userChanged = output<User>();

  currentUser = input<User | null>();

  logout = output();

  private closeMenu = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.menu')) {
      this.showMenu.set(false);
    }
  };

  ngOnInit() {
    document.addEventListener('click', this.closeMenu);
  }

  emitUser(user: User) {
    this.userChanged.emit(user);
    this.showMenu.set(false);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeMenu);
    this.showMenu.set(false);
  }
}
