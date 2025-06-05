import { Component } from '@angular/core';
import { HeaderComponent } from '../../../modules/outer/components/header/header.component';
import { FooterComponent } from '../../../modules/outer/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
