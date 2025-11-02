import { Component, Input } from '@angular/core';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  @Input() sectionId: string = '';
  @Input() sectionTitle: string = '';
  @Input() sectionContent: string = '';
  @Input() sectionCodeSample: string = '';
  @Input() language: string = '';
}
