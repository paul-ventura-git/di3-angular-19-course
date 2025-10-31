import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Mascota } from '../../../../entity/Mascota';

@Component({
  selector: 'app-mascotas',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css',
})
export class MascotasComponent {
  mascotas: Mascota[] = [
    { id: 1, name: 'Mascota 1', owner: 'Dueño 1', raza: 'Raza 1', peso: 10 },
    { id: 2, name: 'Mascota 2', owner: 'Dueño 2', raza: 'Raza 2', peso: 10 },
    { id: 3, name: 'Mascota 3', owner: 'Dueño 3', raza: 'Raza 3', peso: 10 },
    { id: 4, name: 'Mascota 1', owner: 'Dueño 1', raza: 'Raza 1', peso: 10 },
    { id: 5, name: 'Mascota 2', owner: 'Dueño 2', raza: 'Raza 2', peso: 10 },
    { id: 6, name: 'Mascota 3', owner: 'Dueño 3', raza: 'Raza 3', peso: 10 },
    { id: 7, name: 'Mascota 1', owner: 'Dueño 1', raza: 'Raza 1', peso: 10 },
    { id: 8, name: 'Mascota 2', owner: 'Dueño 2', raza: 'Raza 2', peso: 10 },
    { id: 9, name: 'Mascota 3', owner: 'Dueño 3', raza: 'Raza 3', peso: 10 },
    { id: 10, name: 'Mascota 1', owner: 'Dueño 1', raza: 'Raza 1', peso: 10 },
    { id: 11, name: 'Mascota 2', owner: 'Dueño 2', raza: 'Raza 2', peso: 10 },
    { id: 12, name: 'Mascota 3', owner: 'Dueño 3', raza: 'Raza 3', peso: 10 },
  ];
}
