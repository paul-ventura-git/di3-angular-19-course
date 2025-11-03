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
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent {
  steps: Step[] = [];
  sectionIds: string[] = [];
  sectionLabels: string[] = [];
  tsExample = `
    import { DomSanitizer } from '@angular/platform-browser';
    constructor(private sanitizer: DomSanitizer) {}
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(untrustedUrl);
  `;

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
