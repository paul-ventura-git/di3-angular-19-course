import { Component, Input } from '@angular/core';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';

@Component({
  selector: 'app-section',
  imports: [ ScCodeSnippetComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  @Input() sectionId: string = 'defaultSectionId';
  @Input() sectionTitle: string = 'Default Section Title';
  @Input() sectionContent: string = 'Default Section Content';
  @Input() sectionCodeSample: string = '';
  @Input() language: string = 'typescript';
}
