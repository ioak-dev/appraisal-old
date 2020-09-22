import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageHeaderService} from '../core/services/page-header.service';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';
import {CycleService} from '../core/services/cycle.service';
import * as messageObject from '../message.json';
import {FeedbackService} from '../core/services/feedback.service';


@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.scss']
})
export class ViewResponseComponent implements OnInit, OnDestroy {
  loggedInUser: UserType;
  userNameMap: any = {'all': 'All'};
  cycleNameMap: any = {};
  providerIds: string[] = ['all'];
  feedbackJsonObj: any[] = [];
  selectedValue: string;
  selectedCycleId: string;
  questions: string[] = [];
  answers: any[] = [];
  index = 0;
  showAllCycles: boolean;
  cycleIds: string[] = [];
  message_no_feedback: string = messageObject.WORKFLOW.NO_FEEDBACK_PENDING;
  placeholder_select_provider: string = messageObject.PLACEHOLDERS.VIEW_FEEDBACK_SELECT;
  placeholder_select_cycle: string = messageObject.PLACEHOLDERS.VIEW_FEEDBACK_CYCLE_SELECT;
  label_checkbox_cycle: string = messageObject.LABELS.VIEW_RESPONSE_CYCLE_CHECkBOX;

  constructor(private pageHeaderService: PageHeaderService, private cycleSelectionService: CycleSelectionService,
              private feedbackService: FeedbackService, private userService: UserService, private cycleService: CycleService,) {
    pageHeaderService.setTitle(messageObject.PAGE_HEADERS.VIEW_FEEDBACK);
    pageHeaderService.hideCycleFromView = true;
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.initialize());
  }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
        data => {
          this.loggedInUser = data;
          this.initialize();
        }
      );
    }, 100);
  }

  ngOnDestroy(): void {
    this.pageHeaderService.hideCycleFromView = false;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      users => {
        if (users.length > 0) {
          users.forEach((item => {
              this.userNameMap[item.id] = item.name;
            }
          ));
        }
      });
  }

  getAllCycle() {
    this.cycleService.getCycles().subscribe(
      cycles => {
        if (cycles.length > 0) {
          cycles.forEach((item => {
              this.cycleNameMap[item.id] = item.name;
            }
          ));
        }
      });
  }

  initialize() {
    this.getAllUsers();
    this.getAllCycle();
    this.loadCycles(false);
    this.feedbackJsonObj = [];
    this.initializeReceiver();
    this.loadQuestions();
  }

  initializeReceiver() {
    this.feedbackJsonObj = [];
    this.providerIds = ['all'];
    const receiverId = this.loggedInUser.id;
    this.feedbackService.getProviders(this.selectedCycleId, receiverId).subscribe(
      result => {
        result.forEach((item => {
          if (item.status === 'COMPLETED') {
            const obj = {
              providerId: '',
              responses: [],
              status: ''
            };
            obj.providerId = item.providerId;
            obj.responses = item.responses;
            obj.status = item.status;
            this.feedbackJsonObj.push(obj);
            this.providerIds.push(item.providerId);
          }
        }));
        this.selectedValue = this.providerIds[0];
        this.loadAnswers(this.selectedValue);
      }
    );
  }

  loadQuestions() {
    if (this.selectedCycleId) {
      this.cycleService.getCyclebyId(this.selectedCycleId).subscribe(
        response => {
          this.questions = response.questions;
        }
      );
    }
  }

  loadAnswers(providerId) {
    this.answers = [];
    this.index = this.providerIds.indexOf(this.selectedValue);
    if (providerId === 'all') {
      this.feedbackJsonObj.forEach(item => {
        const obj = {};
        obj['key'] = item.providerId;
        obj['responses'] = item.responses;
        this.answers.push(obj);
      });
    } else {
      const answer = this.feedbackJsonObj.find(item => item.providerId === providerId);
      if (answer !== undefined) {
        const obj = {};
        obj['key'] = providerId;
        obj['responses'] = answer.responses;
        this.answers.push(obj);
      }
    }
  }

  next() {
    this.index = this.providerIds.indexOf(this.selectedValue);
    this.index = this.index + 1;
    if (this.index <= this.providerIds.length - 1) {
      this.selectedValue = this.providerIds[this.index];
      this.loadAnswers(this.selectedValue);
    }
  }

  previous() {
    this.index = this.providerIds.indexOf(this.selectedValue);
    this.index = this.index - 1;
    if (this.index >= 1) {
      this.selectedValue = this.providerIds[this.index];
      this.loadAnswers(this.selectedValue);
    }
  }

  loadAllCycleByReceiverId() {
    this.feedbackService.getCyclesByReceiver(this.loggedInUser.id).subscribe(
      result => {
        result.forEach((item => {
          if (this.cycleIds.indexOf(item.cycleId) === -1) {
            this.cycleIds.push(item.cycleId);
          }
        }));
        this.selectedCycleId = this.cycleIds[0];
      }
    );
  }

  loadCycles(showAllCycles) {
    this.cycleIds = [];
    if (showAllCycles) {
      this.loadAllCycleByReceiverId();
    } else {
      JSON.parse(localStorage.getItem('activeCycles')).forEach((item => this.cycleIds.push(item.id)
      ));
      this.selectedCycleId = this.cycleIds[0];
    }
  }
}
