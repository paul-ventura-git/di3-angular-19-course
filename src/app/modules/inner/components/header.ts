import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User, UserRole, users } from '../../../../../backend-vet';
import { AuthService } from '../../../auth/auth.service';
import HeaderSelector from './header-selector';
import { HasRoleDirective } from '../../../core/hasRole.directive';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="#">App con roles en Angular</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                class="nav-link active"
                [routerLinkActiveOptions]="{ exact: true }"
                routerLinkActive="active"
                routerLink="/intranet"
              >
                Mascotas
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                *hasRole="['veterinary', 'admin']"
                routerLinkActive="active"
                routerLink="/intranet/citas"
              >
                Citas
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                *hasRole="['veterinary', 'admin']"
                routerLinkActive="active"
                routerLink="/intranet/historial"
              >
                Historial
              </a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <header>
      <div>
        <app-header-selector
          (logout)="logout()"
          (userChanged)="selectedUser($event)"
          [currentUser]="currentUser()"
          [users]="users()"
        />
      </div>
    </header>
  `,
  imports: [RouterLink, HeaderSelector, RouterLinkActive, HasRoleDirective],
})
export default class Header {
  private _authService = inject(AuthService);

  currentUser = toSignal(this._authService.currentUser$);

  users = signal(users);

  logout() {
    this._authService.logout();
  }

  selectedUser(user: User) {
    this._authService.login(user.email).subscribe();
  }

  hasRole(roles: UserRole[]) {
    return this.currentUser()?.roles.some((role) => roles.includes(role));
  }
}
