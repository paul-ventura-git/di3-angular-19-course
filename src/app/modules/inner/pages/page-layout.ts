import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Header from '../components/header';
import Footer from '../components/footer';

@Component({
  selector: 'app-page-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main>
      <div class="container">
        <router-outlet />
      </div>
    </main>
    <app-footer />
  `,
})
export default class PageLayout {}
