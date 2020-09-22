import {Component, OnInit, Input} from '@angular/core';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-self-appraisal-sectionfour',
  templateUrl: './self-appraisal-sectionfour.component.html',
  styleUrls: ['./self-appraisal-sectionfour.component.scss']
})
export class SelfAppraisalSectionfourComponent implements OnInit {

  currentCycle: CycleType;
  sectionResponse: string;
  @Input() currentUser: UserType;
  @Input() appraisalVisibility: string;
  @Input() reviewerVisibility: string;
  loggedInUser: UserType;

  constructor(private cycleSelectionService: CycleSelectionService,
              private appraisalService: AppraisalService, private userService: UserService, private snackBar: MatSnackBar) {
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
    this.loadAdditionalComment();

  }

  loadAdditionalComment() {
    this.appraisalService.getSectionfourbyUserId(this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        if (response) {
          this.sectionResponse = response.sectionfour;
        }
      }
    );
  }

  save() {
    const jsonObj = {
      'sectionfour': this.sectionResponse
    };
    this.appraisalService.saveSectionFourFeedback(jsonObj, this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        this.snackBar.open('Response Auto Saved', '', {
          duration: 3000,
          panelClass: ['custom-auto-save']
        });
      }
    );
  }

}
