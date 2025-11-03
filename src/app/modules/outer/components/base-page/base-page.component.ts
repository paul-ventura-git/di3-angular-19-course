import { isPlatformBrowser } from '@angular/common';
import { Component, ContentChildren, QueryList, AfterViewInit, NgZone, Input, Inject, PLATFORM_ID } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { ScTitleComponent } from '../../subcomponents/sc-title/sc-title.component';
import { Step } from '../../../../interfaces/interfaceStep';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [StepperComponent, ScTitleComponent],
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css'],
})
export class BasePageComponent implements AfterViewInit {
  @Input() pageTitle = '';
  @Input() steps: Step[] = [];
  @ContentChildren(SectionComponent) sections!: QueryList<SectionComponent>;

  activeStep = '';
  private observer?: IntersectionObserver;

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Solo ejecutar si estamos en el navegador
    if (!isPlatformBrowser(this.platformId)) return;

    // 👁️ Configuramos el observador
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.zone.run(() => (this.activeStep = id));
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observa cada app-section
    this.sections.forEach(s => {
      const el = s.elementRef.nativeElement.querySelector('section');
      if (el) this.observer!.observe(el);
    });
  }

  // 🔁 Scroll suave al hacer clic en el step
  scrollToSection(id: string): void {
    const section = this.sections.find(s => s.sectionId === id);
    if (section) {
      const el = section.elementRef.nativeElement.querySelector('section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.zone.run(() => (this.activeStep = id));
    }
  }
}
