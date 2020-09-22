import {Component, OnInit} from '@angular/core';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {PageHeaderService} from '../core/services/page-header.service';
import {CycleType} from '../model/cycle-type';
import {FeedbackService} from '../core/services/feedback.service';
import {UserService} from '../core/services/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TextInputDialogComponent} from '../core/components/text-input-dialog/text-input-dialog.component';
import * as messageObject from '../message.json';
import {MatSnackBar} from '@angular/material';
import {CycleService} from '../core/services/cycle.service';
import {ReviewResponseService} from './review.response.service';


@Component({
  selector: 'app-review-response',
  templateUrl: './review-response.component.html',
  styleUrls: ['./review-response.component.scss']
})
export class ReviewResponseComponent implements OnInit {

  currentCycle: CycleType;
  receiverIds: string[] = [];
  providerIds: string[] = [];
  receiverToProviderMap: any = {};
  userNameMap: any = {};
  selectedValue: string;
  selectedProviderId: string;
  answers: string[] = [];
  feedbackList: any[] = [];
  questions: string[] = [];
  status: string[] = [];
  index = 0;
  message_no_action: string = messageObject.WORKFLOW.NO_ACTIVE_CYCLE;
  message_response_approved: string = messageObject.WORKFLOW.FEEDBACK_REVIEWED;
  message_response_pending: string = messageObject.WORKFLOW.NO_RESPONSE_PROVIDED;
  statusJson: any = {
    'REVIEW_RESPONSE': 'Ready for review',
    'PENDING_RESPONSE': 'Waiting for response',
    'COMPLETED': 'Review Done'
  };


  constructor(private cycleSelectionService: CycleSelectionService, private pageHeaderService: PageHeaderService,
              private feedbackService: FeedbackService, private userService: UserService, private snackBar: MatSnackBar,
              public dialog: MatDialog, private cycleService: CycleService,
              private reviewResponseService: ReviewResponseService) {
    pageHeaderService.setTitle('Review Selection');
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.initialize());
  }

  ngOnInit() {
    //After loggin for the first time: When user navigates to any page from home page, the initialization of current and active cycles does not complete until ngOnInit on the second page finishes. So, timeout is set for the first navigation away from home component.
    setTimeout(() => {
        this.initializeAllUsersList();
        this.initialize();
        this.loadQuestions();
    }, 100);
  }

  initialize(): void {
    this.receiverToProviderMap = {};
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    this.initializeReceiver();
  }

  initializeAllUsersList() {
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

  initializeReceiver() {
    this.receiverIds = [];
    this.providerIds = [];
    this.feedbackService.getCycle(this.currentCycle.id).subscribe(
      response => {
        if (response.length > 0) {
          // console.log(response);
          response.forEach((item => {
              if (item.receiverId !== null) {
                if (this.receiverToProviderMap[item.receiverId] === undefined) {
                  this.receiverToProviderMap[item.receiverId] = [item.providerId];
                } else {
                  this.receiverToProviderMap[item.receiverId].push(item.providerId);
                }
              }
            }
          ));
        }
        this.receiverIds = Object.keys(this.receiverToProviderMap);
        this.selectedValue = this.receiverIds[0];
        this.providerIds = this.receiverToProviderMap[this.selectedValue];
        this.loadFeedback(this.selectedValue);
      }
    );
  }

  loadQuestions() {
    this.cycleService.getCyclebyId(this.currentCycle.id).subscribe(
      response => {
        this.questions = response.questions;
      }
    );
  }

  loadFeedback(receiver) {
    this.feedbackList = [];
    this.status = [];
    this.selectedValue = receiver;
    this.providerIds = this.receiverToProviderMap[receiver];
    this.feedbackService.getProviders(this.currentCycle.id, receiver).subscribe(
      result => {
        result.forEach((item => {
          const obj = {
            providerId: '',
            responses: [],
            status: ''
          };
          obj.providerId = item.providerId;
          obj.responses = item.responses;
          obj.status = item.status;
          this.feedbackList.push(obj);
          this.status.push(item.status);
        }));
      }
    );
  }

  loadAnswers(providerId) {
    this.selectedProviderId = providerId;
    this.answers = [];
    this.feedbackList.forEach(item => {
      if (item.providerId === providerId) {
        if (item.responses !== null) {
          this.answers = item.responses;
          console.log(this.answers);
        } else {
          this.answers = [];
        }

      }
    });
  }

  next() {
    this.index = this.receiverIds.indexOf(this.selectedValue);
    this.index = this.index + 1;
    if (this.index <= this.receiverIds.length - 1) {
      this.selectedValue = this.receiverIds[this.index];
      this.loadFeedback(this.selectedValue);
    }
  }

  previous() {
    this.index = this.receiverIds.indexOf(this.selectedValue);
    this.index = this.index - 1;
    if (this.index >= 0) {
      this.selectedValue = this.receiverIds[this.index];
      this.loadFeedback(this.selectedValue);
    }
  }

  approve(action) {
    const jsonObj = {
      'receiverId': this.selectedValue,
      'providerId': this.selectedProviderId
    };
    this.reviewResponseService.approve(this.currentCycle.id, jsonObj).subscribe(
      response => {
        this.loadFeedback(this.selectedValue);
        this.snackBar.open(messageObject.APPROVE_RESPONSE.success, action, {
          duration: 3000,
        });
      }
    );

  }

  reject(action, suggestion) {
    const jsonObj = {
      'receiverId': this.selectedValue,
      'providerId': this.selectedProviderId,
      'suggestion': suggestion
    };
    this.reviewResponseService.reject(this.currentCycle.id, jsonObj).subscribe(
      response => {
        this.loadFeedback(this.selectedValue);
        this.snackBar.open(messageObject.REJECT_RESPONSE.success, action, {
          duration: 3000,
        });
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      title: 'Message to Participant',
      placeholder: 'Suggestions to change response',
    };

    const dialogRef = this.dialog.open(TextInputDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reject('reject', result.suggestion);
      }
    });
  }

  reminder(action){
    this.snackBar.open('', action, {
      duration: 3000,
    });
  }
}
