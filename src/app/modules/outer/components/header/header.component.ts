import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.applyTheme(savedTheme);
    } else {
      // Detecta la preferencia del sistema si no hay guardado válido
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  toggleTheme(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const newTheme = isChecked ? 'dark' : 'light';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.isDarkMode = theme === 'dark';
  }
}
