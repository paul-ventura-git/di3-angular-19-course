import { Component, OnInit } from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-directives',
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.css'
})

export class DirectivesComponent {

  toggleButtonStyle() {
    throw new Error('Method not implemented.');
  }

  a= 5;
  b= 5;

  items = [
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 }
  ]

  userPermissions: String = "admin"

  canSave: boolean = true;
  isUnchanged: boolean = false;
  isSpecial: boolean = true;

  currentClasses: Record<string, boolean> = {};
  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }

  currentStyles: Record<string, string> = {};
  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px',
    };
  }

  abc="Hello World";
}
