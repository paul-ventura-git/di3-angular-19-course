import { Component } from '@angular/core';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [UserProfileComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {

}
