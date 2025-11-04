import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SectionComponent } from '../../components/section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';
import { Step } from '../../../../interfaces/interfaceStep';
import { StepsService } from '../../../../core/services/steps.service';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [BasePageComponent, SectionComponent, ScCodeSnippetComponent],
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css'],
})
export class SignalsComponent {
  steps: Step[] = [];
  sectionIds: string[] = [];
  sectionLabels: string[] = [];

  tsExample = `
    Cualquier código
  `

  v01signalExample = `
    import { signal } from '@angular/core';

    const counter = signal(0);
  `

  v02signalExample = `
    console.log(counter()); // imprime 0
  `

  v03signalExample = `
    counter.set(10);
    console.log(counter()); // imprime 10
  `

  v04signalExample = `
    counter.update(value => value + 1);
    console.log(counter()); // imprime 11
  `

  v05signalExample = `
    const user = signal({ name: 'Ana', age: 25 });
    user.mutate(u => u.age++);
    console.log(user()); // { name: 'Ana', age: 26 }
  `

  v06signalExample = `
    const _count = signal(0);
    export const count = _count.asReadonly();
  `

  v07signalExample = `
    effect(() => {
      console.log('El contador es', counter.peek());
      // No reacciona si counter cambia
    });
  `

  v08signalExample = `
    import { signal, computed } from '@angular/core';

    const count = signal(1);
    const double = computed(() => count() * 2);
  `

v09signalExample = `
    import { signal, effect } from '@angular/core';

    const count = signal(0);

    effect(() => {
      console.log("El contador es: "+count());
    });
`

v10signalExample = `
    import { signal, computed, untracked } from '@angular/core';

    const count = signal(0);
    const limit = signal(10);

    const safeValue = computed(() => {
      const l = untracked(() => limit());
      return count() > l ? l : count();
    });
`

v11signalExample = `
    import { toSignal } from '@angular/core/rxjs-interop';
    import { interval } from 'rxjs';

    const seconds = toSignal(interval(1000));
`

v12signalExample = `
    import { signal, linkedSignal } from '@angular/core';

    const count = signal(0);
    const mirrored = linkedSignal({
      source: count,
      transform: (v) => v * 2,
    });
`

  @ViewChildren(SectionComponent) appSections!: QueryList<SectionComponent>;

  constructor(private cd: ChangeDetectorRef, private stepsService: StepsService) {}

  ngOnInit() {
    this.steps = this.stepsService.steps;
  }

  ngAfterViewInit() {
    this.sectionIds = this.appSections.map(s => s.sectionId);
    this.sectionLabels = this.appSections.map(s => s.sectionLabel);

    this.steps = this.sectionIds.map((id, i) => ({
      id,
      label: this.sectionLabels[i],
      number: i + 1
    }));

    this.stepsService.steps = this.steps;

    this.cd.detectChanges();
  }
}
