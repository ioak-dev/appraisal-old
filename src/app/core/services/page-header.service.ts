import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {

  title: string;
  hideCycleFromView: boolean;

  constructor() {
    this.showCycle();
  }

  setTitle(title) {
    this.title = title;
  }

  hideCycle() {
    this.hideCycleFromView = true;
  }

  showCycle() {
    this.hideCycleFromView = false;
  }
}
