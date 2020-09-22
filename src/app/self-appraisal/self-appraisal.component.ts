import {Component, OnInit} from '@angular/core';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {PageHeaderService} from '../core/services/page-header.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';
import {SubmitErrorDialogComponent} from '../submit-error-dialog/submit-error-dialog.component';
import {AuthService} from '../core/services/auth.service';
import {SubmitConfirmationDialogComponent} from '../submit-confirmation-dialog/submit-confirmation-dialog.component'


@Component({
  selector: 'app-self-appraisal',
  templateUrl: './self-appraisal.component.html',
  styleUrls: ['./self-appraisal.component.scss']
})
export class SelfAppraisalComponent implements OnInit {

  currentCycle: CycleType;
  loggedInUser: UserType;
  currentUser: UserType;
  appraisalId: string;
  appraisalVisibility = 'EDITABLE';
  reviewerVisibility = 'HIDDEN';
  error: any;
  status: string;


  constructor(private cycleSelectionService: CycleSelectionService, private pageHeaderService: PageHeaderService,
              public dialog: MatDialog, public appraisalService: AppraisalService, private userService: UserService,
              private authService: AuthService, private snackBar: MatSnackBar) {
    pageHeaderService.setTitle('Self Appraisal');
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.initialize());
  }

  ngOnInit() {
    this.currentUser = undefined;
    setTimeout(() => {
      this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
        data => {
          this.loggedInUser = data;
          // this.currentUser = data;
          this.initialize();
          this.authService.init();
        }
      );
    }, 100);
  }

  initialize() {
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    this.loadAppraisal();
    this.error = null;
  }

  loadAppraisal() {
    this.appraisalService.getAppraisalbyUserId(this.currentCycle.id, this.loggedInUser.id).subscribe(
      response => {
        this.status = response.status;
        this.reviewerVisibility = 'READ-ONLY';
        if (response.status === 'SELF_REVIEW' || response.status === 'SET_GOALS') {
          this.appraisalVisibility = 'EDITABLE';
        } else {
          this.appraisalVisibility = 'READ-ONLY';
        }
        this.appraisalId = response.id;
      }
    );
  }

  save() {
    this.snackBar.open('Response Saved', '', {
      duration: 3000,
      panelClass: ['custom-auto-save']
    });
  }

  submitResponse() {
    this.appraisalService.submitFeedback(this.appraisalId).subscribe(
      response => {
        this.initialize();
      }, error => {
        if (error.status === 406) {
          this.error = error;
          this.openErrorDialog();
        }
      }
    );
  }

  checkResponse() {
    this.appraisalService.errorCheck(this.appraisalId).subscribe(
      response => {
        this.openConfirmationDialog();
      }, error => {
        if (error.status === 406) {
          this.error = error;
          this.openErrorDialog();
        }
      }
    );
  }

  openErrorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = this.error;
    this.dialog.open(SubmitErrorDialogComponent, dialogConfig);

  }
  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {};
    const dialogRef = this.dialog.open(SubmitConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('ok pressed');
        this.submitResponse();
      }
    });
  }
}
