import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SectionComponent } from '../../components/section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';
import { Step } from '../../../../interfaces/interfaceStep';

@Component({
  selector: 'app-security',
  imports: [ BasePageComponent, SectionComponent, ScCodeSnippetComponent],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent {
  steps: Step[] = [];
  sectionIds: string[] = [];
  sectionLabels: string[] = []
  tsExample = `
    import { DomSanitizer } from '@angular/platform-browser';
    constructor(private sanitizer: DomSanitizer) {}
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(untrustedUrl);
  `;
  @ViewChildren(SectionComponent) appSections!: QueryList<SectionComponent>; // El objeto con la lista de los componentes
  @ViewChildren(BasePageComponent) appBasePage!: QueryList<BasePageComponent>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.sectionIds = this.appSections.map(section => section.sectionId);
    this.sectionLabels = this.appSections.map(section => section.sectionLabel);

    console.log(this.sectionIds);
    console.log(this.sectionLabels);
    for(let i=0; i<this.sectionIds.length; i++){
      this.steps[i] = { id: this.sectionIds[i], label: this.sectionLabels[i], number: i+1}
    }
    console.log(this.steps);
    /*
    this.appBasePage.first.steps = [
      { id: this.sectionIds[0] },
      { id: this.sectionIds[1] },
    ];
    this.steps = this.appBasePage.first.steps
    this.cd.detectChanges();
    console.log(this.steps);
    */
  }
}
