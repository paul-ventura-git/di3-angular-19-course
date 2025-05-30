import { Component } from '@angular/core';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ProfilePhotoComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  someUser = "Juan Perez";
  isFormValid = false;
  objectType = "ABC";
  isExpanded = true;
}
