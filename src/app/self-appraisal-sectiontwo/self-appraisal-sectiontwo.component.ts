import {Component, OnInit, Input} from '@angular/core';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-self-appraisal-sectiontwo',
  templateUrl: './self-appraisal-sectiontwo.component.html',
  styleUrls: ['./self-appraisal-sectiontwo.component.scss']
})
export class SelfAppraisalSectiontwoComponent implements OnInit {

  currentCycle: CycleType;
  sectionTopics: any[] = [];
  @Input() appraisalVisibility: string;
  @Input() reviewerVisibility: string;
  @Input() section: string;
  @Input() currentUser: UserType;
  loggedInUser: UserType;

  constructor(private cycleSelectionService: CycleSelectionService,
               private appraisalService: AppraisalService,
               private userService: UserService,
               private snackBar: MatSnackBar) {
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

  initialize() {
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    if (!this.currentUser) {
      this.currentUser = this.loggedInUser;
    }
    this.loadTopics();
  }

  loadTopics() {
    this.appraisalService.getSectiontwobyUserId(this.section, this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        this.sectionTopics = response;
      }
    );
  }

  addTopic () {
    const newTopic = {
      'topic': "",
      'duration': "",
      'comment': ""
    };
    this.sectionTopics.push(newTopic);
  }

  removeTopic (i) {
    this.sectionTopics.splice(i, 1);
  }

  save(responseObject) {
    console.log(responseObject);
    this.appraisalService.saveSectionTwoFeedback(this.section, responseObject, this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        this.snackBar.open('Response Auto Saved', '', {
          duration: 3000,
          panelClass: ['custom-auto-save']
        });
      }
    );
  }
}
