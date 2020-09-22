import { Component, OnInit, OnDestroy } from '@angular/core';
import {PageHeaderService} from '../core/services/page-header.service';
import * as messageObject from '../message.json';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {NotifyDialogComponent} from '../notify-dialog/notify-dialog.component';
import {Router} from '@angular/router';
import {AppraisalService} from '../core/services/appraisal.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit, OnDestroy {

  email: string;
  displayName: string;

  constructor(private router: Router,
              private pageHeaderService: PageHeaderService,
              public dialog: MatDialog,
              private appraisalService: AppraisalService,
              private snackBar: MatSnackBar) {
    this.pageHeaderService.setTitle('Unauthorized Access');
    this.pageHeaderService.hideCycle();
  }

  help() {
    this.router.navigate(['/help']);
  }



  notify(result: any) {
    this.appraisalService.notifyUser(result).subscribe(
      response => {
        this.snackBar.open(messageObject.NOTIFY.success, null, {
          duration: 6000,
        });
      });
  }

  openSupportDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      to: 'appraisal.westernacher@gmail.com',
      subject: 'Subject',
      body: 'Please specify your email Id while raising any question.'
    };
    const dialogRef = this.dialog.open(NotifyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notify(result);
      }
    });
  }

  ngOnInit() {
    this.displayName = sessionStorage.getItem('userDisplayName');
    this.email = sessionStorage.getItem('userSigninName');
  }

  ngOnDestroy(): void {
    this.pageHeaderService.showCycle();
  }

}
