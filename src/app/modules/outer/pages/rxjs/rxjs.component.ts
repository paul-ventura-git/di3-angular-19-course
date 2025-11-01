import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  AfterViewChecked,
  QueryList,
  NgZone,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  // --- Datos y estado ---

  steps = [
    { id: 'whatSection', label: '¿Qué es RxJS?', number: 1 },
    { id: 'mainMethodsSection', label: 'Main Methods', number: 2 },
    { id: 'complementaryMethodsSection', label: 'Complementary Methods', number: 3 },
    { id: 'otherHelpersSection', label: 'Other Helpers', number: 4 }
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
    console.log('🆕 SignalsComponent inicializado');
  }

  ngAfterViewChecked() {
    if (typeof document !== 'undefined') {
      Prism.highlightAll();
    }
  }

  ngAfterViewInit(): void {
    // Esto evita que Prism se ejecute en el servidor y solo lo haga en el navegador.
    if (typeof document !== 'undefined') {
      Prism.highlightAll();
    }
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
    console.log('🧹 SignalsComponent destruido');

    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    if (typeof window !== 'undefined' && this.scrollHandler) {
      const win = window as Window;
      win.removeEventListener('scroll', this.scrollHandler);
      win.removeEventListener('resize', this.scrollHandler);
    }
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
}
