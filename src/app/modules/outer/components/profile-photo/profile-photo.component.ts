import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  standalone: true,
  imports: [],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent {
  myImage = 'https://picsum.photos/200/300';
  someUser = 'Juan Vargas';
}
