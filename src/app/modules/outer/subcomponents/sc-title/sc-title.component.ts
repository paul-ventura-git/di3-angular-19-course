import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sc-title',
  imports: [],
  templateUrl: './sc-title.component.html',
  styleUrl: './sc-title.component.css',
})
export class ScTitleComponent {
  @Input() titleText: string = 'Default Title';
}
