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
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [BasePageComponent, SectionComponent, ScCodeSnippetComponent, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css'],
})
export class ReactiveFormsComponent {
  steps: Step[] = [];
  sectionIds: string[] = [];
  sectionLabels: string[] = [];

  users: any[] = [];

  v01rxjsExample = `
    import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { map, catchError } from 'rxjs/operators';
    import { of } from 'rxjs';

    @Component({
      selector: 'app-users',
      template: \`<ul><li *ngFor="let user of users">{{ user.name }}</li></ul>\`
    })
    export class UsersComponent implements OnInit {
      users: any[] = [];

      constructor(private http: HttpClient) {}

      ngOnInit() {
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
