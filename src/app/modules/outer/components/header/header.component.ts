import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

}
