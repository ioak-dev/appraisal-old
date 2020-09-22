import {Component} from '@angular/core';
import {PageHeaderService} from '../../services/page-header.service';
import {CycleSelectionService} from '../../services/cycle-selection.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor( public pageHeaderService: PageHeaderService,
               public cycleSelectionService: CycleSelectionService,
               public authService: AuthService) { }

  changeCycle(cycle) {
    this.cycleSelectionService.changeCycle(cycle);
  }

}
