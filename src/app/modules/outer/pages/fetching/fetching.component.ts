import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fetching',
  standalone: true,
  imports: [PostFormComponent, FormsModule],
  templateUrl: './fetching.component.html',
  styleUrl: './fetching.component.css'
})
export class FetchingComponent {

}
