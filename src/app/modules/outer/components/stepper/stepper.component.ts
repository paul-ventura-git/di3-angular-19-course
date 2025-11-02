import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-stepper',
  imports: [ CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  @Input() steps: any[] = [];
  @Input() activeStep = '';

  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;

  @Output() stepClick = new EventEmitter<string>(); // 👈 Tipo string

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrollToSection(id: string): void {
    const section = this.sections.find(s => s.nativeElement.id === id);
    if (section) {
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // aplicar activo inmediatamente al hacer click
      this.zone.run(() => (this.activeStep = id));
      this.stepClick.emit(id); // ✅ Emitimos el id, no el evento DOM
    }
  }

  setActiveStep(step: string): void {
    this.activeStep = step;
  }
}
