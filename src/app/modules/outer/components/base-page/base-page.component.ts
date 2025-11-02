import { Component, ElementRef, QueryList, ViewChildren, NgZone } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { ScTitleComponent } from '../../subcomponents/sc-title/sc-title.component';
import { SectionComponent } from '../section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [ StepperComponent, ScTitleComponent, SectionComponent, ScCodeSnippetComponent ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css',
})
export class BasePageComponent {
  // Propiedades del componente
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

  tsExample = `
  function add(a: number, b: number): number {
    return a + b;
  }
  console.log(add(2, 3));
  `;

  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private zone: NgZone,
    //@Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrollToSection(id: string): void {
    const section = this.sections.find(s => s.nativeElement.id === id);
    if (section) {
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // aplicar activo inmediatamente al hacer click
      this.zone.run(() => (this.activeStep = id));
    }
  }
}
