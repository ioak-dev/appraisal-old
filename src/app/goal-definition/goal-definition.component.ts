import { Component, OnInit } from '@angular/core';
import {GoalDefinitionService} from './goal-definition.service';
import {GoalDefinitionType} from '../model/goal-definition-type';
import {PageHeaderService} from '../core/services/page-header.service';
import {AuthService} from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { UserType } from '../model/user-type';

@Component({
  selector: 'app-goal-definition',
  templateUrl: './goal-definition.component.html',
  styleUrls: ['./goal-definition.component.scss']
})
export class GoalDefinitionComponent implements OnInit {

  data: GoalDefinitionType[];
  loggedInUser: UserType;

  constructor(private goalDefinitionService: GoalDefinitionService,
              private pageHeaderService: PageHeaderService,
              private userService: UserService,
              private authService: AuthService) {
    pageHeaderService.setTitle('Goal Definition');
  }

  ngOnInit() {
    //After loggin for the first time: When user navigates to any page from home page, the initialization of current and active cycles does not complete until ngOnInit on the second page finishes. So, timeout is set for the first navigation away from home component.
    setTimeout(() => {
        this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
          data => {
            this.loggedInUser = data;
            this.authService.init();
            this.initialize();
          }
        );
    }, 100);
  }

  initialize() {
    this.goalDefinitionService.getDefinitions(this.loggedInUser.id).subscribe(
      response => {
        this.data = response;
      });
  }

}
