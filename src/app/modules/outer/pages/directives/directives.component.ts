import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SectionComponent } from '../../components/section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';
import { Step } from '../../../../interfaces/interfaceStep';
import { StepsService } from '../../../../core/services/steps.service';

import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [BasePageComponent, SectionComponent, ScCodeSnippetComponent, CommonModule],
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesComponent {
  steps: Step[] = [];
  sectionIds: string[] = [];
  sectionLabels: string[] = [];

  users: any[] = [];

  a="";

  directive01Example = `
  import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

  @Directive({
    selector: '[appSi]'
  })
  export class SiDirective {
    constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}

    @Input() set appSi(cond: boolean) {
      cond ? this.vcr.createEmbeddedView(this.tpl) : this.vcr.clear();
    }
  }
  `

  directive02Example = `
  <div *appSi="mostrar">Esto se muestra si mostrar == true</div>
  `

  directive03Example = `
  @Directive({
    selector: '[appResaltar]'
  })
  export class ResaltarDirective {
    constructor(private el: ElementRef) {}

    @HostListener('mouseenter') onEnter() {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('mouseleave') onLeave() {
      this.el.nativeElement.style.backgroundColor = null;
    }
  }
  `

  directive04Example = `
    <p appResaltar>Pasa el mouse por aquí</p>
  `

  directive05Example = `
    @if (a > b) {
      {{a}} is greater than {{b}} // (Este mensaje solo se muestra cuando a es mayor que b)
    }
  `

  directive06Example = `
    @if (a > b) {
      {{a}} is greater than {{b}}
    } @else if (b > a) {
      {{a}} is less than {{b}}
    } @else {
      {{a}} is equal to {{b}}
    }
  `

  directive07Example = `
    @for (item of items; track item.id) {
      <li>{{item.name}}</li>
    } @empty {
      <li aria-hidden="true"> There are no items. </li>
    }
  `

  directive08Example = `
    @switch (userPermissions) {
    @case ('admin') {
      <p>Se muestra el dashboard de "admin"</p>
    }
    @case ('reviewer') {
      <p>Se muestra el dashboard de "reviewer"</p>
    }
    @case ('editor') {
      <p>Se muestra el dashboard de "editor"</p>
    }
    @default {
      <p>Se muestra el dashboard de "viewer"</p>
    }
  }
  `

  @ViewChildren(SectionComponent) appSections!: QueryList<SectionComponent>;

  constructor(private cd: ChangeDetectorRef, private stepsService: StepsService, private http: HttpClient) {}

  ngOnInit() {
    this.steps = this.stepsService.steps;

    this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((data: any) => data.filter((u: any) => u.id < 5)),
        catchError(err => {
          console.error(err);
          return of([]); // Devuelve un observable vacío si hay error
        })
      )
      .subscribe(result => this.users = result);
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
