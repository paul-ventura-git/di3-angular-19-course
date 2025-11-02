import { Component, ElementRef, QueryList, ViewChildren, NgZone, Input } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { ScTitleComponent } from '../../subcomponents/sc-title/sc-title.component';
import { SectionComponent } from '../section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [ StepperComponent, ScTitleComponent, SectionComponent ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css',
})
export class BasePageComponent {
  // Propiedades del componente
  @Input() pageTitle: string = '';
  @Input() sectionId: string = '';
  @Input() sectionTitle: string = '';
  @Input() sectionContent: string = '';
  @Input() sectionCodeSample: string = '';
  @Input() language: string = '';

  steps: any[] = [
    { id: 'whatSection', label: 'What are directives?', number: 1 },
    { id: 'ifSection', label: '@if', number: 2 },
    { id: 'forSection', label: '@for', number: 3 },
    { id: 'switchSection', label: '@switch', number: 4 },
    { id: 'ngClassSection', label: 'ngClass', number: 5 },
    { id: 'ngStyleSection', label: 'ngStyle', number: 6 },
    { id: 'ngModelSection', label: 'ngModel', number: 7 },
    { id: 'ngOnInitSection', label: 'ngOnInit', number: 8 },
    { id: 'ngOnDestroySection', label: 'ngOnDestroy', number: 9 }
  ];
  activeStep = '';

  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private zone: NgZone,
    //@Inject(PLATFORM_ID) private platformId: Object
  ) {
    //console.log(this.tsExample)
  }

  scrollToSection(id: string): void {
    const section = this.sections.find(s => s.nativeElement.id === id);
    if (section) {
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // aplicar activo inmediatamente al hacer click
      this.zone.run(() => (this.activeStep = id));
    }
  }
}
