import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { users, User } from '../../../backend'; // Adjust the import path as necessary
import { BehaviorSubject, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | null>(this.decodeToken());

  currentUser$ = this._currentUser.asObservable();

  router = inject(Router);

  login(email: string) {
    const user = users.find((user) => user.email === email);

    return of(user || null).pipe(
      tap((user) => {
        if (user) {
          this.saveToken(user);
          this._currentUser.next(user);
          this.router.navigateByUrl('/');
        } else {
          this.removeToken();
        }
      })
    );
  }

  logout() {
    this.removeToken();
    this.router.navigateByUrl('/auth/login');
  }

  private saveToken(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private removeToken() {
    localStorage.removeItem('userData');
  }

  private decodeToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    }

  }
}
