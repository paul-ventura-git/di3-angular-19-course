import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-directives',
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.css'
})

export class DirectivesComponent implements OnInit, OnDestroy {

  // Variables del componente
  a = 95;
  b = 5;
  abc = "Hello World";

  items = [
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 }
  ];

  userPermissions: string = "admin";

  canSave = true;
  isUnchanged = false;
  isSpecial = true;

  currentClasses: Record<string, boolean> = {};
  currentStyles: Record<string, string> = {};

  // Ejemplo: simulamos un observable activo (por ejemplo, actualizaciones en tiempo real)
  private timerSubscription?: Subscription;

  ngOnInit() {
    this.setCurrentClasses();
    this.setCurrentStyles();

    // Iniciamos una suscripción de ejemplo
    // this.timerSubscription = interval(1000).subscribe(count => {
    //   console.log(`⏱️ Tick #${count}`);
    // });

    console.log('DirectivesComponent inicializado');
  }

  // Limpieza del componente
  ngOnDestroy() {
    console.log('DirectivesComponent destruido');

    // Cancelar suscripciones activas
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      console.log('🧹 Suscripción cancelada');
    }

    // Liberar referencias (buena práctica)
    this.items = [];
    this.currentClasses = {};
    this.currentStyles = {};
  }

  onToggleChange1() {
    console.log('El switch cambió. Nuevo valor:', this.canSave);
    this.setCurrentStyles();
  }

  onToggleChange2() {
    console.log('El switch cambió. Nuevo valor:', this.isUnchanged);
    this.setCurrentStyles();
  }

  onToggleChange3() {
    console.log('El switch cambió. Nuevo valor:', this.isSpecial);
    this.setCurrentStyles();
  }

  setCurrentClasses() {
    this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    };
  }

  setCurrentStyles() {
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px',
    };
  }
}

