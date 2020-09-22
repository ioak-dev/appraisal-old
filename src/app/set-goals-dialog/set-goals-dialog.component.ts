import {Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelfAppraisalSectiononeComponent } from '../self-appraisal-sectionone/self-appraisal-sectionone.component';
import {MAT_DIALOG_DATA, MatSnackBar, MatDialog} from '@angular/material';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import * as messageObject from '../message.json';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-set-goals-dialog',
  templateUrl: './set-goals-dialog.component.html',
  styleUrls: ['./set-goals-dialog.component.scss']
})
export class SetGoalsDialogComponent implements OnInit {

  currentCycle: CycleType;
  appraisalId: string;

  @ViewChild(SelfAppraisalSectiononeComponent) child;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
               private snackBar: MatSnackBar,
               private appraisalService: AppraisalService,
               private authService: AuthService,
               public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initialize();
    this.authService.init();
  }

  initialize() {
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    this.loadAppraisal();
  }

  loadAppraisal() {
    this.appraisalService.getAppraisalbyUserId(this.currentCycle.id, this.data.currentUser.id).subscribe(
      response => {
        this.appraisalId = response.id;
      }
    );
  }

  save() {
    this.snackBar.open(messageObject.SET_GOALS.success, null, {
      duration: 3000
    });
  }

  submitSelfGoal() {
    this.appraisalService.submitSelfGoals(this.appraisalId).subscribe (
      response => {
        this.initialize();
        this.snackBar.open(messageObject.SET_GOALS.submit, null, {
          duration: 3000
        });
      }
    );
  }
}
