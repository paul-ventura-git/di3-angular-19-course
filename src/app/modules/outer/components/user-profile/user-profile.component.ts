import { Component } from '@angular/core';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ProfilePhotoComponent, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  someUser = "Juan Perez";
  isFormValid = true;
  objectType = "ABC";
  isExpanded = true;
  firstName = "Alberto";
  initialCount = 18;
}
