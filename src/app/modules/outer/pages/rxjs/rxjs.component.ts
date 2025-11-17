import { ChangeDetectorRef, Component, QueryList, signal, ViewChildren } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SectionComponent } from '../../components/section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';
import { Step } from '../../../../interfaces/interfaceStep';
import { StepsService } from '../../../../core/services/steps.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [BasePageComponent, SectionComponent, ScCodeSnippetComponent, CommonModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent {
  steps: Step[] = [];
  sectionIds: string[] = [];
  sectionLabels: string[] = [];

  users: any[] = [];

  o01observablesExample = `
    this.http.get('/api/users')
  `

  o02observablesExample = `
    toSignal(observable)
    toObservable(signal)
  `

  o03observablesExample = `
    const obs$ = new Observable(observer => {
      observer.next('Hola');
      observer.next('Mundo');
      observer.complete();
    });
  `

  o04observablesExample = `
    obs$.subscribe(value => console.log(value));
  `

  o05observablesExample = `
    this.http.get('/api/users')
      .pipe(
        map(users => users.length),
        filter(count => count > 0),
        delay(1000)
      )
      .subscribe(console.log);
  `

  o06observablesExample = `
    const user$ = new BehaviorSubject(null);
    user$.next({ name: 'Paul' });
  `

  o07observablesExample = `
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    @Injectable({ providedIn: 'root' })
    export class UsersService {
      constructor(private http: HttpClient) {}

      getUsers() {
        return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
      }
    }
  `

  o08observablesExample = `
    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { UsersService } from './users.service';

    @Component({
      selector: 'app-users',
      standalone: true,
      imports: [CommonModule],
      template: \`
        <h2>Usuarios</h2>

        <ul>
          <li *ngFor="let user of users$ | async">
            {{ user.name }}
          </li>
        </ul>
      \`
    })
    export class UsersComponent {
      users$ = this.usersService.getUsers(); // <-- Observable

      constructor(private usersService: UsersService) {}
    }
  `

  safeUrl = signal<SafeResourceUrl | null>(null);

  @ViewChildren(SectionComponent) appSections!: QueryList<SectionComponent>;

  constructor(
    private cd: ChangeDetectorRef,
    private stepsService: StepsService,
    private http: HttpClient,
    sanitizer: DomSanitizer
  ) {
    const url = 'https://www.youtube.com/embed/G7iQi_9WVkE?si=6jzgkiiUKZ4rJ9AV';
    this.safeUrl.set(sanitizer.bypassSecurityTrustResourceUrl(url));
  }

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
