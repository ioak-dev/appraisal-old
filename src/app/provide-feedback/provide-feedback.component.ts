import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PageHeaderService} from '../core/services/page-header.service';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {FeedbackService} from '../core/services/feedback.service';
import {UserService} from '../core/services/user.service';
import {CycleService} from '../core/services/cycle.service';
import {ProvideFeedbackService} from './provide-feedback.service';
import * as messageObject from '../message.json';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-provide-feedback',
  templateUrl: './provide-feedback.component.html',
  styleUrls: ['./provide-feedback.component.scss']
})
export class ProvideFeedbackComponent implements OnInit {

  currentCycle: CycleType;
  loggedInUser: UserType;
  usersJsonObj: any = {};
  receiverJsonObj: any = {};
  receiverIds: string[] = [];
  selectedValue: string;
  Questions: string[] = [];
  answers: string[] = [];
  message: string = messageObject.WORKFLOW.NO_FEEDBACK_PENDING;
  placeholder_select: string = messageObject.PLACEHOLDERS.PROVIDE_FEEDBACK_SELECT;
  placeholder_answer: string = messageObject.PLACEHOLDERS.PROVIDE_FEEDBACK_ANSWERS;

  constructor(private pageHeaderService: PageHeaderService, private cycleSelectionService: CycleSelectionService,
              private feedbackService: FeedbackService, private userService: UserService, private cycleService: CycleService,
              private provideFeedbackService: ProvideFeedbackService, private snackBar: MatSnackBar) {
    pageHeaderService.setTitle(messageObject.PAGE_HEADERS.PROVIDE_FEEDBACK);
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.initialize());
  }

  ngOnInit() {
    //After loggin for the first time: When user navigates to any page from home page, the initialization of current and active cycles does not complete until ngOnInit on the second page finishes. So, timeout is set for the first navigation away from home component.
    setTimeout(() => {
        this.getAllUsers();
        this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
          data => {
            this.loggedInUser = data;
            this.initialize();
          }
        );
    }, 100);
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      users => {
        if (users.length > 0) {
          users.forEach((item => {
              this.usersJsonObj[item.id] = item.name;
            }
          ));
        }
      });
  }

  initialize() {
    this.receiverJsonObj = {};
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    this.initializeReceiver();
    this.getCycle();
  }

  initializeReceiver() {
    this.receiverIds = [];
    const providerId = this.loggedInUser.id;
    this.feedbackService.getReceivers(this.currentCycle.id, providerId).subscribe(
      response => {
        if (response.length > 0) {
          response.forEach((item => {
              if (item.status === 'PENDING_RESPONSE') {
                if (item.responses !== null) {
                  this.receiverJsonObj[item.receiverId] = item.responses;
                } else {
                  this.receiverJsonObj[item.receiverId] = [];
                }
              }
            }
          ));
        }
        this.receiverIds = Object.keys(this.receiverJsonObj);
        this.selectedValue = this.receiverIds[0];
        this.answers = this.receiverJsonObj[this.selectedValue];
      }
    );
  }

  getCycle() {
    this.cycleService.getCyclebyId(this.currentCycle.id).subscribe(
      response => {
        this.Questions = response.questions;
      }
    );
  }

  getAnswers(receiver) {
    this.selectedValue = receiver;
    this.answers = this.receiverJsonObj[receiver];
    console.log(this.answers);
  }

  save(action, selectedValue) {
    const jsonObj = {
      'receiverId': selectedValue,
      'providerId': this.loggedInUser.id,
      'responses': this.answers
    };
    this.feedbackService.saveFeedback(jsonObj, this.currentCycle.id).subscribe(
      response => {
        this.snackBar.open(messageObject.SAVE_FEEDBACK.success, action, {
          duration: 3000,
        });
      }
    );
  }

  submitResponse(action, selectedValue) {
    this.save('', selectedValue);
    const jsonObj = {
      'receiverId': selectedValue,
      'providerId': this.loggedInUser.id,
    };
    this.provideFeedbackService.submitFeedback(jsonObj, this.currentCycle.id).subscribe(
      response => {
        this.snackBar.open(messageObject.SUBMIT_FEEDBACK.success, action, {
          duration: 3000,
        });
      }
    );

    const index = this.receiverIds.indexOf(this.selectedValue);
    this.receiverIds.splice(index, 1);
    if (index < this.receiverIds.length - 1) {
      this.selectedValue = this.receiverIds[index];
      this.getAnswers(this.selectedValue);
    } else {
      this.selectedValue = this.receiverIds[0];
      this.getAnswers(this.selectedValue);
    }
  }

  skip() {
    const index = this.receiverIds.indexOf(this.selectedValue);
    if (index < this.receiverIds.length - 1) {
      this.selectedValue = this.receiverIds[index + 1];
      this.getAnswers(this.selectedValue);
    } else {
      this.selectedValue = this.receiverIds[0];
      this.getAnswers(this.selectedValue);
    }

  }

}
