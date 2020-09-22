import {Component, OnInit, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import {SelfAppraisalSectiononeComponent } from '../self-appraisal-sectionone/self-appraisal-sectionone.component';
import {MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatDialogConfig} from '@angular/material';
import {SubmitErrorDialogComponent} from '../submit-error-dialog/submit-error-dialog.component';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'app-manage-appraisal-dialog',
  templateUrl: './manage-appraisal-dialog.component.html',
  styleUrls: ['./manage-appraisal-dialog.component.scss']
})
export class ManageAppraisalDialogComponent implements OnInit, AfterViewChecked {

  currentCycle: CycleType;
  currentUser: UserType;
  appraisalVisibility = 'READ-ONLY';
  reviewerVisibility = 'EDITABLE';
  appraisalId: string;
  error: any;
  status: string;
  totalScore: string;
  loggedInUser: UserType;
  appraisal: any;
  repAppRes: any;
  showSaveSubmit = false;

  @ViewChild(SelfAppraisalSectiononeComponent) child;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
               private snackBar: MatSnackBar,
               private appraisalService: AppraisalService,
               private userService: UserService,
               public dialog: MatDialog) {
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
    this.loadAppraisal();
    this.error = null;
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      if (this.data.userStatus !== 'SELF_REVIEW') {
        this.totalScore = this.child.totalScore;
      }
    }, 100);
  }

  loadAppraisal() {
    this.appraisalService.getAppraisalbyUserId(this.currentCycle.id, this.data.currentUser.id).subscribe(
      response => {
        this.appraisal = response;
        if (response.sectiononeResponse.length > 0) {
          this.repAppRes = response.sectiononeResponse[0].response[0];
        }
        this.status = response.status;
        // if (response.status === 'SELF_REVIEW') {
        //   this.appraisalVisibility = 'EDITABLE';
        //   this.reviewerVisibility = 'READ-ONLY';
        // } else {
          this.reviewerVisibility = 'EDITABLE';
          this.appraisalVisibility = 'READ-ONLY';
        // }
        this.appraisalId = response.id;
        this.saveSubmit();
      }
    );
  }

  saveSubmit() {
    if (this.repAppRes) {
      if (this.appraisal.status === 'SELF_APPRAISAL' || this.appraisal.status === 'COMPLETE') {
        this.showSaveSubmit = false;
      } else if (this.appraisal.status === 'HR' && this.repAppRes.hrReviews[this.loggedInUser.id]) {
        this.showSaveSubmit = true;
      } else if (this.appraisal.status === 'PRACTICE_DIRECTOR' && this.repAppRes.practiceDirectorReviews[this.loggedInUser.id]) {
        this.showSaveSubmit = true;
      } else if (this.appraisal.status === 'REPORTING_MANAGER' && this.repAppRes.teamLeadReviews[this.loggedInUser.id]) {
        this.showSaveSubmit = true;
      } else if (this.appraisal.status === 'PROJECT_MANAGER' && this.repAppRes.projectManagerReviews[this.loggedInUser.id]) {
        this.showSaveSubmit = true;
      }
    }
  }

  save() {
    this.snackBar.open('Response Saved', null, {
      duration: 3000,
    });
  }

  submitReviewerResponse() {
    this.appraisalService.submitSectionOneReviewerFeedback(this.appraisalId, this.loggedInUser.id).subscribe(
      response => {
        this.initialize();
      }, error => {
        if (error.status === 406) {
          this.error = error;
          this.openDialog();
        }
      }
    );
  }

  markAsScheduled() {
    this.appraisalService.submitReviewerFeedback(this.appraisalId).subscribe(
      response => {
        this.initialize();
      }, error => {
        if (error.status === 406) {
          this.error = error;
          this.openDialog();
        }
      }
    );
  }

  completeAppraisal() {
    this.appraisalService.completeAppraisal(this.appraisalId).subscribe(
      response => {
        this.initialize();
      });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = this.error;
    this.dialog.open(SubmitErrorDialogComponent, dialogConfig);
  }
}
