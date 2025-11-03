import { Injectable } from '@angular/core';
import { Step } from '../../interfaces/interfaceStep';

@Injectable({ providedIn: 'root' })
export class StepsService {
  steps: Step[] = [];
}
