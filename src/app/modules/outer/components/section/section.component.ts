import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionComponent {
  @Input() sectionId = '';
  @Input() sectionLabel = '';
  @Input() sectionTitle = '';
  @Input() sectionContent = '';

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
