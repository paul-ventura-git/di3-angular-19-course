import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Solo se ejecuta en el navegador
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.applyTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
