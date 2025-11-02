import { Component } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SectionComponent } from '../../components/section/section.component';
import { ScCodeSnippetComponent } from '../../subcomponents/sc-code-snippet/sc-code-snippet.component';

@Component({
  selector: 'app-security',
  imports: [ BasePageComponent, SectionComponent, ScCodeSnippetComponent],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent {
  tsExample = `
    import { DomSanitizer } from '@angular/platform-browser';

    constructor(private sanitizer: DomSanitizer) {}

    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(untrustedUrl);
  `;
}
