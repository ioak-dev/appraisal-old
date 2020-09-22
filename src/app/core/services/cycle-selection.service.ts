import {EventEmitter, Injectable} from '@angular/core';
import {CycleType} from '../../model/cycle-type';

@Injectable({
  providedIn: 'root',
})
export class CycleSelectionService {

  currentCycle: CycleType;
  activeCycles: CycleType[];

  cycleChangedEvent = new EventEmitter();

  changeCycle(cycle) {
    this.currentCycle = cycle;
    localStorage.setItem('currentCycle', JSON.stringify(cycle));
    this.cycleChangedEvent.emit(cycle);
  }

  initialize() {
    if (localStorage.getItem('activeCycles')) {
        this.activeCycles = JSON.parse(localStorage.getItem('activeCycles'));
    }

    if (localStorage.getItem('currentCycle')) {
        this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    }
  }
}
