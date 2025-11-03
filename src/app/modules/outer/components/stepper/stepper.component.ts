import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  @Input() steps: any[] = [];
  @Input() activeStep = '';
  @Output() stepClick = new EventEmitter<string>();

  scrollToSection(id: string): void {
    this.stepClick.emit(id);
  }

  isActive(id: string): boolean {
    return this.activeStep === id;
  }
}
