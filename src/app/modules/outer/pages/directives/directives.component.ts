import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, AfterViewInit, QueryList, NgZone } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    NgStyle,
    FormsModule,
  ],
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private zone: NgZone) {} // 👈 inyectamos NgZone

  // Variables
  a = 95;
  b = 5;
  abc = "Hello World";

  items = [
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 }
  ];

  userPermissions = "admin";
  canSave = true;
  isUnchanged = false;
  isSpecial = true;

  currentClasses: Record<string, boolean> = {};
  currentStyles: Record<string, string> = {};
  private timerSubscription?: Subscription;

  steps = [
    { id: 'ifSection', label: '@if', number: 1 },
    { id: 'forSection', label: '@for', number: 2 },
    { id: 'switchSection', label: '@switch', number: 3 },
    { id: 'ngClassSection', label: 'ngClass', number: 4 },
    { id: 'ngStyleSection', label: 'ngStyle', number: 5 },
    { id: 'ngModelSection', label: 'ngModel', number: 6 },
    { id: 'ngOnInitSection', label: 'ngOnInit', number: 7 },
    { id: 'ngOnDestroySection', label: 'ngOnDestroy', number: 8 },
  ];

  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;

  activeStep: string = '';

  scrollToSection(id: string) {
    const section = this.sections.find(s => s.nativeElement.id === id);
    if (section) {
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeStep = id; // 👈 activa inmediatamente al hacer click
    }
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.setCurrentStyles();
  }

  ngAfterViewInit() {
    // ⚠️ Solo ejecutamos el observer si el entorno del navegador lo soporta
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.zone.run(() => {
              this.activeStep = entry.target.id;
            });
          }
        });
      }, { threshold: 0.2 });

      this.sections.forEach(section => observer.observe(section.nativeElement));
    } else {
      console.warn('⚠️ IntersectionObserver no está disponible en este entorno.');
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.items = [];
    this.currentClasses = {};
    this.currentStyles = {};
  }

  onToggleChange1() { this.setCurrentStyles(); }
  onToggleChange2() { this.setCurrentStyles(); }
  onToggleChange3() { this.setCurrentStyles(); }

  setCurrentClasses() {
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }

  setCurrentStyles() {
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px',
    };
  }
}
