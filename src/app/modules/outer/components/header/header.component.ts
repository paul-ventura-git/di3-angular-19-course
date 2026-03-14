import { Component, inject, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HasRoleDirective } from '../../../../core/hasRole.directive';
import { AuthService } from '../../../../auth/auth.service';
import { CartService } from '../../../../core/services/cart.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, HasRoleDirective, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  authService = inject(AuthService);

  userName = 'Paul';
  isDarkMode = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public cart: CartService
  ) {}

  // Para renderizar el Dropdown.
  async ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {

      const bootstrap = await import('bootstrap');

      const dropdownElementList =
        document.querySelectorAll('[data-bs-toggle="dropdown"]');

      dropdownElementList.forEach(el => {
        new bootstrap.Dropdown(el);
      });

    }

  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.applyTheme(savedTheme);
      } else {
        const prefersDark =
          window.matchMedia('(prefers-color-scheme: dark)').matches;

        this.applyTheme(prefersDark ? 'dark' : 'light');
      }

    }

  }

  toggleTheme(event: Event): void {

    if (isPlatformBrowser(this.platformId)) {

      const isChecked = (event.target as HTMLInputElement).checked;
      const newTheme = (isChecked ? 'dark' : 'light') as 'light' | 'dark';

      this.applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);

    }

  }

  private applyTheme(theme: 'light' | 'dark'): void {

    if (isPlatformBrowser(this.platformId)) {

      document.documentElement.setAttribute('data-bs-theme', theme);
      this.isDarkMode = theme === 'dark';

    }

  }
}
