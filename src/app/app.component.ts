import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./shared/components/layout/layout.component";
import { HomeComponent } from "./modules/outer/pages/home/home.component";
import { HeaderComponent } from './modules/outer/components/header/header.component';
import { FooterComponent } from "./modules/outer/components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LayoutComponent, HomeComponent, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-course';
  name: string = 'Paul Ventura';
}
