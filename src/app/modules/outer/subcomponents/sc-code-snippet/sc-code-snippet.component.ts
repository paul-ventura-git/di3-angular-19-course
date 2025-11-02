import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript'; // Importa los lenguajes que quieras
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-sc-code-snippet',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sc-code-snippet.component.html',
  styleUrls: ['./sc-code-snippet.component.css']
})
export class ScCodeSnippetComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'typescript';

  /** Referencia al elemento <code> para aplicar PrismJS */
  @ViewChild('codeBlock') codeBlock!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    // Aplica el resaltado
    if (this.codeBlock) {
      Prism.highlightElement(this.codeBlock.nativeElement);
    }
  }
}
