import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  QueryList,
  NgZone,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [NgClass, NgStyle, FormsModule, CommonModule],
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit, AfterViewInit, OnDestroy {
  // --- Datos y estado ---
  a = 95;
  b = 5;
  abc = 'Hello World';

  items = [
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 }
  ];

  userPermissions = 'admin';

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
    { id: 'ngOnDestroySection', label: 'ngOnDestroy', number: 8 }
  ];

  @ViewChildren('sectionRef') sections!: QueryList<ElementRef<HTMLElement>>;

  activeStep = '';

  private sectionObserver?: IntersectionObserver;
  private scrollHandler?: () => void;
  private rafId: number | null = null;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // -----------------------
  // Lifecycle
  // -----------------------
  ngOnInit(): void {
    // inicializa clases/estilos reactivos
    this.setCurrentClasses();
    this.setCurrentStyles();
    console.log('✅ DirectivesComponent inicializado');
  }

  ngAfterViewInit(): void {
    // No ejecutar en SSR
    if (!isPlatformBrowser(this.platformId)) return;

    const win = window as unknown as Window & typeof globalThis;

    // Si IntersectionObserver existe, usarlo
    if (typeof (win as any).IntersectionObserver !== 'undefined') {
      this.sectionObserver = new (win as any).IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Aseguramos que Angular detecte el cambio
              this.zone.run(() => (this.activeStep = entry.target.id));
            }
          });
        },
        { threshold: 0.6 }
      );

      this.sections.forEach(s => this.sectionObserver!.observe(s.nativeElement));
      return;
    }

    // Fallback por scroll si IntersectionObserver no está disponible
    console.warn('⚠️ IntersectionObserver no está disponible, usando fallback por scroll.');

    const checkVisible = () => {
      const vh = win.innerHeight || document.documentElement.clientHeight;
      let bestId = this.activeStep;
      let bestRatio = 0;

      this.sections.forEach(s => {
        const rect = s.nativeElement.getBoundingClientRect();
        const height = rect.height <= 0 ? 1 : rect.height;
        const intersectTop = Math.max(rect.top, 0);
        const intersectBottom = Math.min(rect.bottom, vh);
        const intersectionHeight = Math.max(0, intersectBottom - intersectTop);
        const ratio = intersectionHeight / height;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = s.nativeElement.id;
        }
      });

      if (bestRatio >= 0.6 && this.activeStep !== bestId) {
        this.zone.run(() => (this.activeStep = bestId));
      }
    };

    this.scrollHandler = () => {
      if (this.rafId != null) return;
      this.rafId = win.requestAnimationFrame(() => {
        checkVisible();
        this.rafId = null;
      });
    };

    // chequeo inicial y listeners
    checkVisible();
    win.addEventListener('scroll', this.scrollHandler!, { passive: true });
    win.addEventListener('resize', this.scrollHandler!, { passive: true });
  }

  ngOnDestroy(): void {
    console.log('🧹 DirectivesComponent destruido');

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    if (typeof window !== 'undefined' && this.scrollHandler) {
      const win = window as Window;
      win.removeEventListener('scroll', this.scrollHandler);
      win.removeEventListener('resize', this.scrollHandler);
    }

    // limpiar referencias
    this.items = [];
    this.currentClasses = {};
    this.currentStyles = {};
  }

  // -----------------------
  // Helpers / UI actions
  // -----------------------
  scrollToSection(id: string): void {
    const section = this.sections.find(s => s.nativeElement.id === id);
    if (section) {
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // aplicar activo inmediatamente al hacer click
      this.zone.run(() => (this.activeStep = id));
    }
  }

  setActiveStep(step: string): void {
    this.activeStep = step;
  }

  onToggleChange1(): void {
    console.log('El switch cambió. Nuevo valor:', this.canSave);
    this.setCurrentStyles();
  }

  onToggleChange2(): void {
    console.log('El switch cambió. Nuevo valor:', this.isUnchanged);
    this.setCurrentStyles();
  }

  onToggleChange3(): void {
    console.log('El switch cambió. Nuevo valor:', this.isSpecial);
    this.setCurrentStyles();
  }

  // -----------------------
  // Métodos que actualizan clases/estilos
  // -----------------------
  setCurrentClasses(): void {
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial
    };
  }

  setCurrentStyles(): void {
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px'
    };
  }
}
